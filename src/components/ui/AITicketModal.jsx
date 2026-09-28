import { useEffect } from "react";
import {
  SparklesIcon,
  CloseIcon,
  TagIcon,
  FlagIcon,
  GaugeIcon,
  DeptIcon,
  DatabaseIcon,
  ChartIcon,
  DocIcon,
  AlertIcon
} from "../icons";
import { StatCard, SectionTitle } from "./StatCard";
import {
  CATEGORY_LABELS,
  DEPARTMENT_LABELS,
  ENTITY_LABELS,
  PRIORITY_LABELS,
  PRIORITY_TONES,
} from "../../constants/complaintLabels";
import RobotAvatar from "../custom/RobotAvatar";

export function AITicketModal({
  loading,
  error,
  result,
  onClose,
  onAccept,
  onReject,
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const disabled = loading || !result;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fadeIn"
      />

      <div
        dir="rtl"
        className="
          relative z-10 flex w-full max-w-3xl flex-col
          max-h-[92vh] sm:max-h-[88vh]
          rounded-t-3xl sm:rounded-3xl border border-white/10
          bg-app-secondary/95 backdrop-blur-2xl
          shadow-[0_0_60px_-10px_rgba(44,167,124,0.5)]
          animate-modalIn overflow-hidden
        "
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-brand-blue/20 blur-[100px]" />
          <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-brand-teal/20 blur-[100px]" />
        </div>

        <ModalHeader onClose={onClose} />

        <div className="ai-modal-scroll relative z-10 flex-1 overflow-y-auto px-5 sm:px-6 py-5">
          {loading && <LoadingState />}
          {!loading && error && <ErrorState error={error} />}
          {!loading && result && <ResultContent result={result} />}
        </div>

        <ModalFooter
          disabled={disabled}
          onAccept={onAccept}
          onReject={onReject}
        />
      </div>
    </div>
  );
}

function ModalHeader({ onClose }) {
  return (
    <div className="relative z-10 flex items-start justify-between gap-3 border-b border-white/10 px-5 sm:px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient shadow-[0_0_20px_-3px_rgba(44,167,124,0.7)]">
          <RobotAvatar
            size={56}
            // speaking={isRobotSpeaking}
            showMicButton={false}
            isMuted={true}
          />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-transparent bg-clip-text bg-brand-gradient">
            تذكرة مقترحة من AI Agent
          </h2>
          <p className="text-[11px] text-cyan-100/60">
            راجع التفاصيل واعتمد أو ارفض التذكرة
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-cyan-100/70 transition hover:bg-white/[0.08] hover:text-white"
        aria-label="إغلاق"
      >
        <CloseIcon />
      </button>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-brand-teal border-t-transparent" />
      <p className="text-sm text-cyan-100/70">
        جارٍ تحليل الشكوى بواسطة AI Agent…
      </p>
    </div>
  );
}

function ErrorState({ error }) {
  return (
    <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-5 text-center">
      <p className="text-sm font-medium text-red-200">{error}</p>
    </div>
  );
}

function ModalFooter({ disabled, onAccept, onReject }) {
  return (
    <div className="relative z-10 flex flex-col-reverse gap-2 border-t border-white/10 bg-app-primary/50 px-5 sm:px-6 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-end">
      <button
        onClick={onReject}
        disabled={disabled}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-cyan-100/80 transition hover:bg-white/[0.08] disabled:opacity-40"
      >
        رفض
      </button>
      <button
        onClick={onAccept}
        disabled={disabled}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-teal px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_25px_-5px_rgba(44,167,124,0.7)] transition hover:brightness-110 disabled:opacity-40"
      >
        موافق
      </button>
    </div>
  );
}

function ResultContent({ result }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="نوع الشكوى" tone="brand" icon={<TagIcon />}>
          {CATEGORY_LABELS[result.category] || result.category}
        </StatCard>
        <StatCard label="الأولوية" icon={<FlagIcon />}>
          <span
            className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ${
              PRIORITY_TONES[result.priority] || PRIORITY_TONES.medium
            }`}
          >
            {PRIORITY_LABELS[result.priority] || result.priority}
          </span>
        </StatCard>
        <StatCard label="نسبة الثقة" icon={<GaugeIcon />}>
          {(result.confidence * 100).toFixed(1)}%
        </StatCard>
        <StatCard label="القسم" icon={<DeptIcon />}>
          {DEPARTMENT_LABELS[result.department] || result.department || "—"}
        </StatCard>
      </div>

      {result.entities && Object.keys(result.entities).length > 0 && (
        <EntitiesSection entities={result.entities} />
      )}

      {result.escalated && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-400/40 bg-amber-500/10 p-4 backdrop-blur-md animate-fadeIn">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-400/20 text-amber-300">
            <AlertIcon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold text-amber-200">
              هذه الحالة تحتاج مراجعة بشرية
            </p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-amber-100/80">
              هذه الحالة يرجى مراجعتها من قبل الموظف المختص وليس الوكيل للذكاء
              الصناعي.
            </p>
            {result.escalation_reason && (
              <p className="mt-2 rounded-lg border border-amber-400/20 bg-amber-500/5 px-3 py-1.5 font-mono text-[11px] text-amber-200/90">
                {result.escalation_reason}
              </p>
            )}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {result.category_probabilities && (
          <ProbabilitiesSection probabilities={result.category_probabilities} />
        )}
        {result.draft_report && (
          <DraftReportSection report={result.draft_report} />
        )}
      </div>
    </div>
  );
}

function EntitiesSection({ entities }) {
  return (
    <section>
      <SectionTitle icon={<DatabaseIcon />}>بيانات تم استخراجها</SectionTitle>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {Object.entries(entities).map(([k, v]) => (
          <div
            key={k}
            className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
          >
            <p className="text-[10px] text-cyan-100/40">
              {ENTITY_LABELS[k] || k}
            </p>
            <p className="mt-0.5 truncate font-mono text-xs text-cyan-50">
              {v ?? "—"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

const BAR_TONES = [
  "from-brand-blue to-brand-teal",
  "from-brand-teal to-emerald-400",
  "from-cyan-400 to-brand-blue",
  "from-slate-400 to-slate-500",
];

function ProbabilitiesSection({ probabilities }) {
  const sorted = Object.entries(probabilities)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-blue/15 text-brand-blue">
          <ChartIcon />
        </span>
        <h4 className="text-xs font-bold uppercase tracking-wide text-cyan-100/70">
          الأصناف الأكثر رجوحاً
        </h4>
      </div>

      <div className="space-y-3">
        {sorted.map(([k, v], idx) => (
          <div key={k}>
            <div className="mb-1.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/[0.05] text-[10px] font-bold text-cyan-100/70">
                  {idx + 1}
                </span>
                <span className="text-[12px] text-cyan-50/90">
                  {CATEGORY_LABELS[k] || k}
                </span>
              </div>
              <span className="font-mono text-[11px] font-semibold text-brand-teal">
                {v.toFixed(3)}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.05]">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${
                  BAR_TONES[idx] || BAR_TONES[3]
                } transition-all duration-700`}
                style={{ width: `${Math.min(v * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DraftReportSection({ report }) {
  const formatted = report
    .replace(/ملخص الحالة:/g, "ملخص الشكوى:")
    .replace(/الإجراء المقترح:/g, "الإجراء الموصى به:");

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-teal/15 text-brand-teal">
          <DocIcon />
        </span>
        <h4 className="text-xs font-bold uppercase tracking-wide text-cyan-100/70">
          التقرير المقترح
        </h4>
      </div>
      <div className="whitespace-pre-wrap rounded-xl border border-white/5 bg-app-primary/40 p-4 text-[13px] leading-relaxed text-cyan-50/90">
        {formatted}
      </div>
    </section>
  );
}
