import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Lightweight onboarding tour with spotlight + tooltip.
 *
 * @param {Array<{ target: string, title: string, content: string, placement?: "top"|"bottom"|"left"|"right" }>} steps
 * @param {boolean} open
 * @param {() => void} onClose
 * @param {string} storageKey  localStorage key so it only shows once
 */
export default function OnboardingTour({
  steps = [],
  open,
  onClose,
  storageKey = "onboarding_done",
}) {
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState(null);
  const tooltipRef = useRef(null);

  const step = steps[index];

  useLayoutEffect(() => {
    if (!open || !step) return;

    const update = () => {
      const el = document.querySelector(step.target);
      if (!el) {
        setRect(null);
        return;
      }
      const r = el.getBoundingClientRect();
      setRect({
        top: r.top,
        left: r.left,
        width: r.width,
        height: r.height,
      });
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);

    const t = setInterval(update, 400);

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
      clearInterval(t);
    };
  }, [open, step, index]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const handleClose = () => {
    if (storageKey) localStorage.setItem(storageKey, "1");
    onClose?.();
  };

  const handleNext = () => {
    if (index < steps.length - 1) setIndex((i) => i + 1);
    else handleClose();
  };

  const handlePrev = () => {
    if (index > 0) setIndex((i) => i - 1);
  };

  if (!open || !step) return null;

  const PAD = 12;
  const tooltipW = 320;

  let tooltipStyle = {};
  if (rect) {
    const placement = step.placement || "bottom";

    if (placement === "bottom") {
      tooltipStyle = {
        top: rect.top + rect.height + PAD,
        left: Math.max(
          12,
          Math.min(
            window.innerWidth - tooltipW - 12,
            rect.left + rect.width / 2 - tooltipW / 2,
          ),
        ),
      };
    } else if (placement === "top") {
      tooltipStyle = {
        top: rect.top - PAD - 200,
        left: Math.max(
          12,
          Math.min(
            window.innerWidth - tooltipW - 12,
            rect.left + rect.width / 2 - tooltipW / 2,
          ),
        ),
      };
    } else if (placement === "left") {
      tooltipStyle = {
        top: rect.top,
        left: Math.max(12, rect.left - tooltipW - PAD),
      };
    } else {
      tooltipStyle = {
        top: rect.top,
        left: Math.min(
          window.innerWidth - tooltipW - 12,
          rect.left + rect.width + PAD,
        ),
      };
    }
  }

  return createPortal(
    <div
      dir="rtl"
      className="fixed inset-0 z-[100] font-almarai"
      role="dialog"
      aria-modal="true"
    >
      <svg className="absolute inset-0 h-full w-full pointer-events-auto">
        <defs>
          <mask id="tour-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {rect && (
              <rect
                x={rect.left - 6}
                y={rect.top - 6}
                width={rect.width + 12}
                height={rect.height + 12}
                rx="14"
                ry="14"
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0.65)"
          mask="url(#tour-mask)"
        />
      </svg>

      {rect && (
        <div
          className="pointer-events-none absolute rounded-2xl ring-2 ring-brand-teal shadow-[0_0_40px_-5px_rgba(44,167,124,0.8)] transition-all duration-300"
          style={{
            top: rect.top - 6,
            left: rect.left - 6,
            width: rect.width + 12,
            height: rect.height + 12,
          }}
        />
      )}

      <div
        ref={tooltipRef}
        className="
          absolute w-[320px] max-w-[calc(100vw-24px)]
          rounded-2xl border border-white/10
          bg-app-secondary/95 backdrop-blur-2xl
          p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]
          animate-modalIn
        "
        style={tooltipStyle}
      >
        <div className="pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full bg-brand-teal/20 blur-[60px]" />

        <div className="relative z-10">
          <div className="mb-2 flex items-center justify-between">
            <span className="rounded-full border border-brand-teal/40 bg-brand-teal/10 px-2.5 py-0.5 text-[10px] font-semibold text-brand-teal">
              {index + 1} / {steps.length}
            </span>
            <button
              onClick={handleClose}
              className="text-[11px] font-medium text-cyan-100/50 transition hover:text-cyan-100"
            >
              تخطي
            </button>
          </div>

          <h3 className="text-sm font-bold text-transparent bg-clip-text bg-brand-gradient">
            {step.title}
          </h3>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-cyan-100/80">
            {step.content}
          </p>

          <div className="mt-3 flex items-center gap-1.5">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-brand-gradient" : "w-1.5 bg-white/15"
                }`}
              />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between gap-2">
            <button
              onClick={handlePrev}
              disabled={index === 0}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-cyan-100/80 transition hover:bg-white/[0.08] disabled:opacity-30"
            >
              السابق
            </button>

            <button
              onClick={handleNext}
              className="
                group relative inline-flex items-center gap-1.5 overflow-hidden
                rounded-xl bg-brand-gradient px-4 py-1.5
                text-xs font-bold text-white
                shadow-[0_0_20px_-5px_rgba(44,167,124,0.7)]
                transition-all duration-300 hover:scale-[1.03] active:scale-95
              "
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative z-10">
                {index === steps.length - 1 ? "إنهاء" : "التالي"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
