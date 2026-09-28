import React from "react";
import { SparkleIcon } from "../ui";

function IconInbox({ className = "h-[18px] w-[18px]" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M3.5 12.5h4.2l1.4 2.6h5.8l1.4-2.6h4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.2 6.4 3.5 12.5v5.3c0 .9.7 1.6 1.6 1.6h13.8c.9 0 1.6-.7 1.6-1.6v-5.3l-1.7-6.1a1.6 1.6 0 0 0-1.54-1.2H6.74A1.6 1.6 0 0 0 5.2 6.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconTicket({ className = "h-[18px] w-[18px]" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 9.2c0-1 .8-1.7 1.7-1.7h12.6c.9 0 1.7.8 1.7 1.7v1.3a1.9 1.9 0 0 0 0 3v1.3c0 1-.8 1.7-1.7 1.7H5.7A1.7 1.7 0 0 1 4 14.8v-1.3a1.9 1.9 0 0 0 0-3V9.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M10 7.5v9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeDasharray="1.8 1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPlus({ className = "h-[18px] w-[18px]" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="8.3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 8.6v6.8M8.6 12h6.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const NAV = [
  {
    key: "complaines",
    label: "الشكاوى",
    hint: "كل الرسائل الواردة",
    icon: IconInbox,
  },
  // {
  //   key: "tickets",
  //   label: "التذاكر",
  //   hint: "مصنّفة بواسطة الذكاء الاصطناعي",
  //   icon: IconTicket,
  //   ai: true,
  // },
  {
    key: "add",
    label: "شكوى جديدة",
    hint: "تسجيل شكوى يدويًا",
    icon: IconPlus,
  },
];

export default function Layout({ active, onNavigate, children }) {
  return (
    <div dir="rtl" className="min-h-screen bg-[#F5F6F8] text-[#111827]">
      <div className="flex min-h-screen w-full">
        <aside
          className="
            sticky top-0 hidden h-screen shrink-0 flex-col justify-between
            border-l border-[#E4E7EC] bg-white
            px-2.5 py-5 transition-[width] duration-300
            md:flex md:w-[76px]
            lg:w-[248px] lg:px-4
          "
        >
          <div>
            <div className="flex items-center justify-center gap-2.5 lg:justify-start lg:px-1">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0C5C53] text-white shadow-sm shadow-[#0C5C53]/30">
                <SparkleIcon className="h-[18px] w-[18px]" />
              </div>
              <div className="hidden min-w-0 lg:block">
                <p className="truncate text-sm font-semibold tracking-tight text-[#101828]">
                  مركز الشكاوي
                </p>
                <p className="truncate text-[11px] text-[#98A2B3]">
                  محفظة زين كاش الرقمية
                </p>
              </div>
            </div>

            <p className="mt-7 hidden px-2 text-[10px] font-semibold uppercase tracking-wider text-[#98A2B3] lg:block">
              القائمة
            </p>

            <nav className="mt-2 flex flex-col gap-1">
              {NAV.map((item) => {
                const isActive = active === item.key;
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    onClick={() => onNavigate(item.key)}
                    className={`group relative flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-right transition-all duration-200 md:justify-center lg:justify-start lg:px-3 ${
                      isActive
                        ? "bg-[#0C5C53] text-white shadow-sm shadow-[#0C5C53]/25"
                        : "text-[#475467] hover:bg-[#F2F4F7]"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
                        isActive
                          ? "bg-white/15 text-white"
                          : "text-[#667085] group-hover:text-[#0C5C53]"
                      }`}
                    >
                      <Icon />
                    </span>
                    <span className="hidden min-w-0 flex-1 flex-col items-start lg:flex">
                      <span className="flex items-center gap-1.5 text-sm font-medium">
                        {item.label}
                        {item.ai && !isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#0C5C53]" />
                        )}
                      </span>
                      <span
                        className={`truncate text-[11px] transition-colors duration-200 ${
                          isActive ? "text-white/70" : "text-[#98A2B3]"
                        }`}
                      >
                        {item.hint}
                      </span>
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="hidden rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] px-3 py-3 lg:block">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0C5C53] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0C5C53]" />
              </span>
              <p className="text-xs font-medium text-[#344054]">
                نموذج الذكاء الاصطناعي نشط
              </p>
            </div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-[#98A2B3]">
              يحلّل الرسائل ويحوّلها الى تكتات تلقائيًا
            </p>
          </div>
        </aside>

        <div className="fixed inset-x-3 bottom-3 z-30 flex items-center gap-1 rounded-2xl border border-[#E4E7EC] bg-white/95 p-1.5 shadow-lg shadow-black/5 backdrop-blur md:hidden">
          {NAV.map((item) => {
            const isActive = active === item.key;
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#0C5C53] text-white"
                    : "text-[#667085] hover:bg-[#F2F4F7]"
                }`}
              >
                <Icon />
                {item.label}
              </button>
            );
          })}
        </div>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
