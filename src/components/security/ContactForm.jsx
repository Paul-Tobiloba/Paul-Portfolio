import { useState } from "react";
import styles from "../../../styles/SecurityPortfolio.module.css";
export default function ContactForm() {
  const [status,setStatus]=useState({type:"idle",message:""});
  async function submit(event) {
    event.preventDefault();
    const form=event.currentTarget;
    const data=Object.fromEntries(new FormData(form).entries());
    setStatus({type:"pending",message:"Sending your message…"});
    try {
      const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
      const body=await response.json();
      if(!response.ok) throw new Error(body.message||"Your message could not be sent. Please try again or email me directly.");
      form.reset();setStatus({type:"success",message:"Thanks, your message was sent successfully."});
    } catch(error) {setStatus({type:"error",message:error.message||"Please try again or email me directly."});}
  }
  return <details className={styles.contactDisclosure}><summary>Send a message</summary><form className={styles.contactForm} onSubmit={submit}><div className={styles.formRow}><label>Your name<input name="name" required autoComplete="name" maxLength={100}/></label><label>Email address<input type="email" name="email" required autoComplete="email" maxLength={254}/></label></div><label>Subject<input name="subject" required maxLength={150}/></label><label>Message<textarea name="message" rows={5} required maxLength={5000}/></label><button type="submit" className={styles.primaryButton} disabled={status.type==="pending"}>{status.type==="pending"?"Sending…":"Send message"}</button><p role="status" aria-live="polite" className={status.type==="error"?styles.formError:styles.smallNote}>{status.message}</p></form></details>;
}
