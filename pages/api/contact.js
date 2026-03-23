import nodemailer from "nodemailer";

const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL || "oluwatobiloba.xyz@gmail.com";

const escapeHtml = (value = "") =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const getTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === "true" || Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Method not allowed." });
  }

  const { name = "", email = "", subject = "", message = "" } = req.body ?? {};
  const payload = {
    name: String(name).trim(),
    email: String(email).trim(),
    subject: String(subject).trim(),
    message: String(message).trim(),
  };

  if (!payload.name || !payload.email || !payload.subject || !payload.message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const transporter = getTransporter();

  if (!transporter) {
    console.error("[contact-api] Missing SMTP configuration.");
    return res.status(500).json({
      message: "Something went wrong while sending your message. Please try again later.",
    });
  }

  const fromAddress =
    process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER || CONTACT_TO_EMAIL;

  try {
    await transporter.sendMail({
      from: fromAddress,
      to: CONTACT_TO_EMAIL,
      replyTo: payload.email,
      subject: `[Portfolio] ${payload.subject}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Subject: ${payload.subject}`,
        "",
        payload.message,
      ].join("\n"),
      html: `
        <div>
          <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(payload.message).replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    return res.status(200).json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("[contact-api] Mail send failed:", error);

    return res.status(500).json({
      message: "Something went wrong while sending your message. Please try again later.",
    });
  }
}
