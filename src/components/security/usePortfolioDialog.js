import { useEffect, useRef } from "react";

export default function usePortfolioDialog(open, onClose, initialFocus) {
  const dialog = useRef(null);
  useEffect(() => {
    if (!open || !dialog.current) return;
    const modal = dialog.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    if (!modal.open) modal.showModal();
    document.body.style.overflow = "hidden";
    (initialFocus?.current || modal.querySelector("button, a[href], input"))?.focus({ preventScroll: true });
    return () => {
      modal.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [open, initialFocus]);
  return {
    ref: dialog,
    onCancel(event) { event.preventDefault(); onClose(); },
    onClick(event) {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
    },
    onKeyDown(event) {
      if (event.key !== "Tab") return;
      const controls = [...dialog.current.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), [tabindex="0"]')].filter(item => item.getClientRects().length);
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && (event.target === first || event.target === dialog.current)) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && event.target === last) { event.preventDefault(); first?.focus(); }
    },
  };
}
