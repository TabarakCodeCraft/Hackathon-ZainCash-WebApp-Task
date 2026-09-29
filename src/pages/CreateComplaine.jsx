import React, { useState } from "react";
import {
  PriorityBadge,
  CategoryTag,
  StatusBadge,
} from "../components/ui/Badges";
import { api } from "../lib/api";
import {
  PlusIcon,
  CheckIcon,
  CloseIcon,
  SparklesIcon,
} from "../components/icons";

const emptyMsg = () => ({ text: "" });

export default function AddComplaint() {
  const [messages, setMessages] = useState([emptyMsg()]);
  const [submitted, setSubmitted] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  function updateMessage(i, text) {
    setMessages((prev) => prev.map((m, idx) => (idx === i ? { text } : m)));
  }
  function addMessage() {
    setMessages((prev) => [...prev, emptyMsg()]);
  }
  function removeMessage(i) {
    setMessages((prev) =>
      prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev,
    );
  }

  function validate() {
    const next = {};
    if (messages.every((m) => !m.text.trim())) {
      next.messages = "أضف نص رسالة واحدة على الأقل.";
    }
    return next;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError(null);

    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    const payload = {
      msgs: messages
        .filter((m) => m.text.trim())
        .map((m, idx) => ({
          msg_id: `msg_${Date.now()}_${idx}`,
          seq: idx + 1,
          text: m.text.trim(),
        })),
    };

    setSubmitting(true);
    try {
      const created = await api.post("/complaines", payload);
      setSubmitted(created);
    } catch (err) {
      setSubmitError(err.message || "تعذّر إنشاء الشكوى، حاول مرة أخرى.");
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    setMessages([emptyMsg()]);
    setSubmitted(null);
    setErrors({});
    setSubmitError(null);
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-app-gradient text-black font-almarai"
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-brand-blue/15 blur-[120px] animate-pulse-slow" />
        <div className="absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-brand-teal/15 blur-[120px] animate-pulse-slow" />
      </div>

      <main className="relative z-10 mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6">
        <header className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-brand-gradient">
              إضافة شكوى جديدة
            </h1>
          </div>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-cyan-900/80">
            استخدم هذا النموذج لتسجيل شكوى وردت عبر قناة أخرى غير المحادثة
            الآلية. سيتم إنشاء تذكرة جديدة تلقائيًا بنفس التصنيف والأولوية
            المحددين.
          </p>
        </header>

        {submitted ? (
          <SuccessCard complaint={submitted} onReset={resetForm} />
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <section className="rounded-2xl border border-brand-teal/20 bg-white/[0.03] p-4 backdrop-blur-md sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-cyan-900">
                    رسائل الشكوى
                  </h2>
                  <p className="mt-0.5 text-[11px] text-cyan-900/60">
                    أضف رسالة واحدة أو أكثر كما وصلت من العميل.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addMessage}
                  className="
                    group inline-flex items-center gap-2 rounded-xl
                    px-3 py-2 text-xs font-semibold text-cyan-700
                    transition hover:bg-brand-teal/20
                  "
                >
                  <PlusIcon className="h-3.5 w-3.5" />
                  إضافة رسالة
                </button>
              </div>

              <div className="flex flex-col gap-2.5">
                {messages.map((m, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <textarea
                      value={m.text}
                      onChange={(e) => updateMessage(i, e.target.value)}
                      rows={2}
                      placeholder={`نص الرسالة ${i + 1}…`}
                      className="
                        w-full resize-none rounded-xl
                        border border-brand-teal/20 bg-white/70
                        text-cyan-900 placeholder:text-cyan-900/30
                        px-4 py-2.5 text-sm leading-relaxed focus:outline-none
                        focus:ring-2 focus:ring-brand-teal/30
                        transition
                      "
                    />
                    {messages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMessage(i)}
                        className="mt-1 shrink-0 rounded-lg p-2 text-red-500 transition bg-red-500/10 hover:bg-red-500/20"
                        aria-label="حذف الرسالة"
                      >
                        <CloseIcon className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {errors.messages && (
                <p className="mt-3 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs text-red-600">
                  {errors.messages}
                </p>
              )}

              <div className="mt-5 flex flex-col-reverse items-stretch gap-2.5 border-t border-brand-teal/15 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => (window.location.href = "/complaines")}
                  className="
                    group/back relative inline-flex items-center justify-center gap-2
                    overflow-hidden rounded-xl
                    border border-cyan-900/15 bg-white/50
                    px-5 py-2.5
                    text-sm font-semibold text-cyan-900
                    backdrop-blur-md
                    transition-all duration-300
                    hover:border-cyan-900/30 hover:bg-white/80
                    active:scale-[0.98]
                  "
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-900/5 to-transparent transition-transform duration-700 group-hover/back:translate-x-full" />
                  <ArrowRightIcon className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/back:-translate-x-0.5" />
                  <span className="relative z-10">
                    الرجوع لصفحة شكاوى العملاء
                  </span>
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="
                    group relative inline-flex items-center justify-center gap-2
                    overflow-hidden rounded-xl px-5 py-2.5
                    text-sm font-bold text-white
                    bg-gradient-to-r from-cyan-700 to-brand-teal
                    shadow-[0_0_25px_-5px_rgba(59,115,255,0.5)]
                    hover:shadow-[0_0_35px_-2px_rgba(44,167,124,0.7)]
                    transition-all duration-300
                    hover:scale-[1.02] active:scale-95
                    disabled:opacity-60 disabled:cursor-wait
                  "
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  {submitting ? (
                    <>
                      <Spinner />
                      <span className="relative z-10">جارٍ الإرسال…</span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">إرسال الشكوى</span>
                    </>
                  )}
                </button>
              </div>

              {submitError && (
                <div className="mt-3 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2.5 text-xs text-red-600">
                  {submitError}
                </div>
              )}
            </section>
            <AITransformCard />
          </form>
        )}
      </main>
    </div>
  );
}

function AITransformCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-brand-teal/30 bg-brand-teal/[0.06] p-5 backdrop-blur-md">
      <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-brand-teal/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-brand-blue/15 blur-3xl" />

      <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-teal/25" />
          <span
            className="absolute inset-1 animate-pulse rounded-full bg-brand-teal/20"
            style={{ animationDuration: "2.2s" }}
          />
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient text-white shadow-[0_0_20px_-3px_rgba(44,167,124,0.7)]">
            <SparklesIcon className="h-5 w-5" />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-bold text-transparent bg-clip-text bg-brand-gradient">
              الذكاء الاصطناعي يقرأ الشكوى ويحوّلها إلى تذكرة
            </h3>
          </div>

          <p className="mt-1 text-xs leading-relaxed text-cyan-900/80">
            بمجرد إرسال الشكوى الى الصفحة الرئيسية، سيقوم النموذج المدرب
            تلقائيًا بـ:
          </p>

          <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-cyan-900/80">
            <Step delay="0s" label=" قراءة النص وفهمه" />
            <Step
              delay="0.10s"
              label="معرفة نوع المشكلة وتحويلها بشكل تلقائي الى القسم المختص"
            />
            <Step
              delay="0.20s"
              label="التركيز على اي معطيات موجودة بداخل النص واستخراجها كعناصر قابلة للنسخ والتخزين مثل التواريخ والمبالغ وارقام الحسابات ..اللخ"
            />
            <Step
              delay="0.30s"
              label="اعطاء درجة اولوية للتذكرة مثل عالي، متوسط،او منخفض"
            />
            <Step
              delay="0.45s"
              label="انشاء ملخص للمشكلة بعد فهمها واقتراح حل الى موظف المتابعة"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

function Step({ delay = "0s", label }) {
  return (
    <li className="inline-flex items-center gap-1.5">
      <span
        className="h-1.5 w-1.5 rounded-full bg-brand-teal"
        style={{ animationDelay: delay, animationDuration: "1.6s" }}
      />
      {label}
    </li>
  );
}

function SuccessCard({ complaint, onReset }) {
  const ticket = complaint?.ticket;
  const shortId = (complaint?.UniqueID || "").slice(-6);

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-teal/40 bg-brand-teal/[0.05] backdrop-blur-md">
      <div className="flex items-start gap-3 border-b border-brand-teal/15 bg-brand-teal/[0.06] px-5 py-4 sm:px-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white shadow-[0_0_20px_-3px_rgba(44,167,124,0.7)]">
          <CheckIcon className="h-[18px] w-[18px]" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-transparent bg-clip-text bg-brand-gradient">
            تم تسجيل الشكوى بنجاح
          </p>
          <p className="mt-0.5 text-xs text-cyan-900/80">
            رقم الشكوى:{" "}
            <span className="font-mono font-semibold text-brand-teal">
              #{shortId}
            </span>
            {ticket && (
              <>
                {" "}
                · رقم التذكرة:{" "}
                <span className="font-mono font-semibold text-brand-teal">
                  #{String(ticket.id || ticket.ticket_id || "").slice(-6)}
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="px-5 py-4 sm:px-6">
        {ticket ? (
          <div className="mb-3 flex flex-wrap items-center gap-1.5">
            {ticket.category && <CategoryTag value={ticket.category} />}
            {ticket.priority && <PriorityBadge value={ticket.priority} />}
            {ticket.status && <StatusBadge value={ticket.status} />}
          </div>
        ) : (
          <div className="mb-4 flex items-center gap-2.5 rounded-xl border border-brand-teal/25 bg-brand-teal/[0.08] px-3.5 py-2.5">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-teal opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-teal" />
            </span>
            <p className="text-[11.5px] leading-relaxed text-cyan-900/80">
              لقد تم تحويل الشكوى للصفحة الرئيسية للشكاوى.. ليتم إنشاء التذكرة
              بواسطة وكيلك للذكاء الصناعي
            </p>
          </div>
        )}

        <section className="rounded-2xl border border-brand-teal/25 bg-white/[0.03] overflow-hidden">
          <div className="flex items-center justify-between border-b border-brand-teal/15 bg-brand-teal/[0.06] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-teal/20 text-brand-teal">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 6h16M4 12h16M4 18h10" />
                </svg>
              </span>
              <h3 className="text-[13px] font-bold text-cyan-900 tracking-wide">
                الرسائل المُسجّلة
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-teal/30 bg-white/60 px-3 py-1 text-[11px] font-bold text-brand-teal tabular-nums shadow-sm">
              {(complaint.msgs || []).length}
              <span className="text-cyan-800/70 font-medium">رسالة</span>
            </span>
          </div>

          <ol className="flex flex-col divide-y divide-brand-teal/10">
            {(complaint.msgs || []).map((m, i) => (
              <li
                key={m.msg_id ?? m.seq ?? i}
                className="flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-brand-teal/[0.04]"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-brand-teal/30 bg-brand-teal/15 text-[11px] font-bold text-brand-teal tabular-nums shadow-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <p className="min-w-0 flex-1 text-[13.5px] leading-relaxed text-cyan-900">
                  {m.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-5 flex flex-col-reverse items-stretch gap-2.5 border-t border-brand-teal/15 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={onReset}
            className="
              group/new relative inline-flex items-center justify-center gap-2
              overflow-hidden rounded-xl
              border border-brand-teal/50 bg-brand-teal/[0.12]
              px-4 py-2.5
              text-[13px] font-bold text-brand-teal
              backdrop-blur-md
              transition-all duration-300
              hover:border-brand-teal hover:bg-brand-teal/[0.2]
              hover:shadow-[0_0_25px_-8px_rgba(44,167,124,0.7)]
              active:scale-[0.98]
            "
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-brand-teal/25 to-transparent transition-transform duration-700 group-hover/new:translate-x-full" />
            <PlusIcon className="relative z-10 h-4 w-4" />
            <span className="relative z-10">تسجيل شكوى أخرى</span>
          </button>

          <button
            onClick={() => (window.location.href = "/complaines")}
            className="
              group/back relative inline-flex items-center justify-center gap-2
              overflow-hidden rounded-xl
              border border-cyan-900/15 bg-white/50
              px-4 py-2.5
              text-[13px] font-semibold text-cyan-900
              backdrop-blur-md
              transition-all duration-300
              hover:border-cyan-900/30 hover:bg-white/80
              active:scale-[0.98]
            "
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-900/5 to-transparent transition-transform duration-700 group-hover/back:translate-x-full" />
            <ArrowRightIcon className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/back:-translate-x-0.5" />
            <span className="relative z-10">الرجوع لصفحة شكاوى العملاء</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function AIBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-teal/40 bg-brand-teal/10 px-3 py-1 text-[11px] font-semibold text-brand-teal">
      <SparklesIcon className="h-3 w-3" />
      {children}
    </span>
  );
}

function ArrowRightIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity=".25"
        strokeWidth="2.5"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
