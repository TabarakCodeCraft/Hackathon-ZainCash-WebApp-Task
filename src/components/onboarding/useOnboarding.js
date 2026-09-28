import { useEffect, useState } from "react";

export default function useOnboarding(storageKey = "onboarding_done") {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const done = localStorage.getItem(storageKey);
    if (!done) {
      // small delay so targets render
      const t = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(t);
    }
  }, [storageKey]);

  const close = () => setOpen(false);
  const restart = () => {
    localStorage.removeItem(storageKey);
    setOpen(true);
  };

  return { open, close, restart };
}