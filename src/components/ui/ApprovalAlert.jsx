import React, { useEffect, useState } from "react";
import { CheckIcon, CloseIcon } from "../icons";

export function ApprovalAlert({ type, message, onClose, duration = 3200 }) {
  const isSuccess = type === "success";
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), duration - 300);
    const t2 = setTimeout(() => onClose?.(), duration);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [duration, onClose]);

  const tone = isSuccess
    ? {
        ring: "ring-emerald-400/20",
        border: "border-emerald-400/25",
        bg: "bg-[#0b1f1a]/85",
        glow: "shadow-[0_20px_60px_-15px_rgba(16,185,129,0.45)]",
        iconBg: "bg-gradient-to-br from-emerald-400 to-teal-600",
        iconGlow: "shadow-[0_0_25px_-4px_rgba(16,185,129,0.9)]",
        title: "text-emerald-50",
        sub: "text-emerald-100/60",
        bar: "from-emerald-400 via-teal-400 to-emerald-400",
        label: "تم اعتماد التذكرة",
        caption: "تم تحويل التذكرة إلى القسم المختص",
      }
    : {
        ring: "ring-rose-400/20",
        border: "border-rose-400/25",
        bg: "bg-[#1f0b12]/85",
        glow: "shadow-[0_20px_60px_-15px_rgba(244,63,94,0.45)]",
        iconBg: "bg-gradient-to-br from-rose-400 to-red-600",
        iconGlow: "shadow-[0_0_25px_-4px_rgba(244,63,94,0.9)]",
        title: "text-rose-50",
        sub: "text-rose-100/60",
        bar: "from-rose-400 via-red-400 to-rose-400",
        label: "تم رفض التذكرة",
        caption: "تم إلغاء التذكرة المقترحة",
      };

  return (
    <div
      dir="rtl"
      className="pointer-events-none fixed inset-x-0 top-4 z-[70] flex justify-center px-4"
    >
      <div
        role="alert"
        className={`
          pointer-events-auto relative w-full max-w-md overflow-hidden
          rounded-2xl border ${tone.border} ${tone.bg} ${tone.glow}
          ring-1 ${tone.ring} backdrop-blur-2xl
          transition-all duration-300 ease-out
          ${leaving ? "opacity-0 -translate-y-3 scale-[0.98]" : "opacity-100 translate-y-0 scale-100"}
        `}
        style={{
          animation: leaving
            ? undefined
            : "alertIn 0.45s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="absolute inset-x-0 top-0 h-[2px] bg-white/5 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${tone.bar}`}
            style={{
              animation: `shrinkBar ${duration}ms linear forwards`,
            }}
          />
        </div>

        <div className="flex items-start gap-3.5 px-4 py-3.5">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
            <span
              className={`absolute inset-0 rounded-2xl ${tone.iconBg} ${tone.iconGlow}`}
            />
            <span className="absolute inset-0 rounded-2xl ring-1 ring-white/20" />
            <span className="relative z-10 text-white">
              {isSuccess ? (
                <CheckIcon className="h-5 w-5" strokeWidth={3} />
              ) : (
                <CloseIcon className="h-5 w-5" strokeWidth={3} />
              )}
            </span>
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <p
              className={`text-[13.5px] font-bold tracking-tight ${tone.title}`}
            >
              {tone.label}
            </p>
            <p className={`mt-0.5 truncate text-[12px] ${tone.sub}`}>
              {message || tone.caption}
            </p>
          </div>

          <button
            onClick={() => {
              setLeaving(true);
              setTimeout(() => onClose?.(), 200);
            }}
            className="shrink-0 rounded-lg p-1.5 text-white/40 transition hover:bg-white/10 hover:text-white/80"
            aria-label="إغلاق"
          >
            <CloseIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes alertIn {
          0%   { opacity: 0; transform: translateY(-14px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0)     scale(1); }
        }
        @keyframes shrinkBar {
          from { width: 100%; }
          to   { width: 0%;   }
        }
      `}</style>
    </div>
  );
}
