import { CheckIcon, InfoIcon } from "../icons";

export function Toast({ type = "success", message }) {
  const isSuccess = type === "success";
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[60] flex justify-center px-4">
      <div
        className={`
          pointer-events-auto flex items-center gap-3
          rounded-2xl border px-4 py-3 backdrop-blur-xl
          shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]
          animate-toastIn
          ${
            isSuccess
              ? "border-brand-teal/40 bg-brand-teal/10 text-black"
              : "border-white/15 bg-white/[0.06] text-black"
          }
        `}
      >
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            isSuccess ? "bg-brand-teal/20" : "bg-white/10"
          }`}
        >
          {isSuccess ? <CheckIcon /> : <InfoIcon />}
        </span>
        <p className="text-sm font-semibold">{message}</p>
      </div>
    </div>
  );
}
