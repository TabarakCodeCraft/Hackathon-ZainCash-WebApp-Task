import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import RobotAvatar from "../components/custom/RobotAvatar";
import { AITicketModal } from "../components/ui/AITicketModal";
import {
  PlusIcon,
  SearchIcon,
  SparklesIcon,
  TicketIcon,
} from "../components/icons";
import OnboardingTour from "../components/onboarding/OnboardingTour";
import useOnboarding from "../components/onboarding/useOnboarding";
import { ApprovalAlert } from "../components/ui/ApprovalAlert";

function formatDate(iso) {
  try {
    const d = new Date(iso);
    const pad = (n) => String(n).padStart(2, "0");

    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1);
    const day = pad(d.getDate());

    let hours = d.getHours();
    const minutes = pad(d.getMinutes());
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${year}/${day}/${month} ${hours}:${minutes}${ampm}`;
  } catch {
    return iso;
  }
}

const AVATAR_SIZE = 180;

export default function ComplainesList() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [complaines, setComplaines] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [aiState, setAiState] = useState({});
  const [isRobotSpeaking, setIsRobotSpeaking] = useState(false);
  const [modalComplaintId, setModalComplaintId] = useState(null);
  const [toast, setToast] = useState(null);

  const { open: tourOpen, close: closeTour } = useOnboarding(
    "onboarding_complaints_v1",
  );

  const tourSteps = [
    {
      target: "[data-tour='complaint-card']",
      title: "الشكوى",
      content: "هذه إحدى الشكاوى الآتية من العملاء داخل اللستة.",
      placement: "bottom",
    },
    {
      target: "[data-tour='ai-button']",
      title: "AI Agent",
      content:
        "لتجربة عمل الذكاء الصناعي في تحويل الشكوى إلى تذكرة، اضغط هذا الزر.",
      placement: "top",
    },
    {
      target: "[data-tour='create-complaint']",
      title: "إنشاء شكوى",
      content: "من خلال هذا الزر، يمكنك إنشاء شكوى يدويًا وإدخال تفاصيلها حسب الحاجة. تُستخدم هذه الخاصية لزيادة تنوع بيانات اختبار النموذج، وتجربة حالات خاصة وسيناريوهات مختلفة للتحقق من دقة النموذج واستجابته",
      placement: "bottom",
    },
  ];

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/complaines", { page, limit: 10 });
        if (cancelled) return;
        setComplaines(res.data || []);
        setPagination(res.pagination || {});
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [page]);

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return complaines;
    return complaines.filter(
      (c) =>
        c.msgs?.some((m) => m.text.includes(q)) ||
        c.UniqueID?.includes(q) ||
        (c.ticket?.category || "").includes(q),
    );
  }, [query, complaines]);

  const showToast = (type, message, ms = 3200) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), ms);
  };

  async function handleAIProcess(complaintId, msgs) {
    setAiState((prev) => ({
      ...prev,
      [complaintId]: { loading: true, result: null, error: null },
    }));
    setModalComplaintId(complaintId);

    try {
      const result = await api.infer(msgs);
      setAiState((prev) => ({
        ...prev,
        [complaintId]: { loading: false, result, msgs, error: null },
      }));
    } catch (e) {
      setAiState((prev) => ({
        ...prev,
        [complaintId]: { loading: false, result: null, error: e.message },
      }));
    }
  }

  const handleAction = (complaintId, action) => {
    setModalComplaintId(null);
    showToast(
      action === "accepted" ? "success" : "info",
      action === "accepted" ? "تم قبول التذكرة بنجاح" : "تم رفض التذكرة",
    );
    setTimeout(() => {
      setAiState((prev) => {
        const next = { ...prev };
        delete next[complaintId];
        return next;
      });
    }, 400);
  };

  const handleRequestTicket = (id, msgs) => {
    setIsRobotSpeaking(true);
    handleAIProcess(id, msgs);
    setTimeout(() => setIsRobotSpeaking(false), 2500);
  };

  const activeState = modalComplaintId ? aiState[modalComplaintId] : null;

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-app-gradient text-white font-almarai"
    >
      <BackgroundGlow />

      <Header
        isRobotSpeaking={isRobotSpeaking}
        onCreate={() => navigate("/create_complaine")}
      />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6">
        <Hero total={pagination.total} fallbackTotal={filtered.length} />

        <SearchBar query={query} onChange={setQuery} />

        {loading && <LoadingState />}
        {error && !loading && <ErrorState error={error} />}

        {!loading && !error && (
          <>
            <ul className="flex flex-col gap-4">
              {filtered.map((c, i) => (
                <ComplaintCard
                  key={c.UniqueID || c.id}
                  index={i}
                  complaint={c}
                  state={aiState[c.UniqueID || c.id] || {}}
                  onRequestTicket={handleRequestTicket}
                  onViewTicket={() => setModalComplaintId(c.UniqueID || c.id)}
                />
              ))}

              {filtered.length === 0 && <EmptyState />}
            </ul>

            {pagination.totalPages > 1 && (
              <Pagination
                pagination={pagination}
                onPrev={() => setPage((p) => Math.max(1, p - 1))}
                onNext={() => setPage((p) => p + 1)}
                onPage={setPage}
              />
            )}
          </>
        )}
      </main>

      {modalComplaintId && activeState && (
        <AITicketModal
          loading={activeState.loading}
          error={activeState.error}
          result={activeState.result}
          msgs={activeState.msgs}
          onClose={() => setModalComplaintId(null)}
          onAccept={() => handleAction(modalComplaintId, "accepted")}
          onReject={() => handleAction(modalComplaintId, "rejected")}
        />
      )}

      {toast && (
        <ApprovalAlert
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
      <OnboardingTour
        open={tourOpen}
        steps={tourSteps}
        onClose={closeTour}
        storageKey="onboarding_complaints_v1"
      />
    </div>
  );
}

function BackgroundGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-brand-blue/15 blur-[120px] animate-pulse-slow" />
      <div className="absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-brand-teal/15 blur-[120px] animate-pulse-slow" />
    </div>
  );
}

function Header({ isRobotSpeaking, onCreate }) {
  return (
    <header className="relative z-20 border-b border-white/5 bg-app-primary/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <RobotAvatar
            size={56}
            speaking={isRobotSpeaking}
            showMicButton={false}
            isMuted={true}
          />
          <div className="leading-tight">
            <p className="text-sm sm:text-base font-bold text-transparent bg-clip-text bg-brand-gradient">
              زين كاش العراق AI Agent
            </p>
            <div class="flex items-center gap-2 text-[11px] bg-cyan-700 p-1 text-white rounded my-1">
              <div className="w-2 h-2 bg-green-200 rounded-full animate-pulse mr-1"></div>
              <p>
                <span>Qwen-3B-QLoRA-4Bit-Iraq</span>
                <span className="px-2">نموذج نشط</span>
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          data-tour="create-complaint"
          onClick={onCreate}
          className="group relative inline-flex items-center gap-2 rounded px-4 bg-cyan-700  py-2 text-xs font-bold text-white shadow-[0_0_25px_-5px_rgba(59,115,255,0.6)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_35px_-2px_rgba(44,167,124,0.7)] active:scale-95 sm:px-5 sm:py-2.5 sm:text-sm overflow-hidden"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <PlusIcon className="h-4 w-4 relative z-10" />
          <span className="relative z-10 hidden sm:inline">شكوى جديدة</span>
        </button>
      </div>
    </header>
  );
}

function Hero({ total, fallbackTotal }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-brand-gradient">
          كل الرسائل التي أرسلها العملاء
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-teal-600">
          هذه قائمة الشكاوى كما وصلت من العملاء مرتبة تنازليًا حسب وقت الاستلام.
        </p>
      </div>
      <span className="inline-flex items-center gap-2 rounded border px-3 py-1.5 text-xs font-medium text-black backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-teal shadow-[0_0_8px_#2CA77C]" />
        <span className="tabular-nums">{total || fallbackTotal}</span>
        <span className="opacity-70">الكل</span>
      </span>
    </div>
  );
}

function SearchBar({ query, onChange }) {
  return (
    <div className="mb-5 rounded-xl border p-2 backdrop-blur-md">
      <div className="relative flex-1">
        <SearchIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="ابحث في نص الشكوى أو التصنيف…"
          className="w-full rounded-xl border text-black border-white/10 bg-app-secondary/60 py-2.5 pr-10 pl-4 text-sm transition focus:outline-none"
        />
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-12 text-center backdrop-blur-md">
      <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-brand-teal border-t-transparent" />
      <p className="text-sm">جارٍ التحميل…</p>
    </div>
  );
}

function ErrorState({ error }) {
  return (
    <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-5 py-4 text-sm">
      {error}
    </div>
  );
}

function EmptyState() {
  return (
    <li className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-5 py-12 text-center text-black backdrop-blur-md">
      <p className="text-sm font-medium">لا توجد نتائج</p>
    </li>
  );
}

function ComplaintCard({
  index,
  complaint,
  state,
  onRequestTicket,
  onViewTicket,
}) {
  const id = complaint.UniqueID || complaint.id;
  const created = complaint.createdAt || complaint.ticket?.complaine?.createdAt;
  const sortedMsgs = [...(complaint.msgs || [])].sort((a, b) => a.seq - b.seq);

  const { loading, result, error } = state;
  const hasResult = !!result;
  const hasError = !!error;

  const isFirst = index === 0;

  return (
    <li
      data-tour={isFirst ? "complaint-card" : undefined}
      className={`group relative rounded p-5 bg-brand-teal/[0.08] transition-all duration-300`}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <span
          className="rounded-md border text-gray-500 font-mono text-[10px] p-1 tracking-wider"
          dir="ltr"
        >
          #{id.slice(-9)}
        </span>
        <span className="text-[12px] text-gray-500" dir="ltr">
          {formatDate(created)}
        </span>
      </div>

      <div className="mb-4 space-y-1.5">
        {sortedMsgs.map((m) => (
          <p
            key={m.msg_id ?? m.seq}
            className="text-[13.5px] leading-relaxed text-black"
          >
            {m.text}
          </p>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/5 pt-4">
        <div className="text-[11px] text-cyan-100/40">
          {hasResult && !loading && "نتيجة AI جاهزة للعرض"}
          {hasError && !loading && "حدث خطأ أثناء التحليل"}
        </div>

        <div className="flex items-center gap-2">
          {hasError && (
            <span className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-[11px] text-red-200">
              خطأ في التحليل
            </span>
          )}

          {hasResult && !loading ? (
            <button
              onClick={onViewTicket}
              className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-brand-blue to-brand-teal px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_25px_-5px_rgba(59,115,255,0.6)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_35px_-2px_rgba(44,167,124,0.7)] active:scale-95"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
              <TicketIcon />
              <span className="relative z-10">عرض تذكرة الـ AI</span>
            </button>
          ) : (
            <button
              data-tour={isFirst ? "ai-button" : undefined}
              onClick={() => onRequestTicket(id, sortedMsgs)}
              disabled={loading}
              className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-brand-blue via-[#4b8bff] to-brand-teal px-5 py-2.5 text-sm font-semibold  shadow-[0_0_25px_-5px_rgba(59,115,255,0.6)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_35px_-2px_rgba(44,167,124,0.7)] active:scale-95 disabled:cursor-wait disabled:opacity-60"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
              <SparklesIcon />
              <span className="relative z-10">
                {loading ? "جارٍ التحليل…" : "أطلب من AI Agent انشاء تذكرة"}
              </span>
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

function Pagination({ pagination, onPrev, onNext, onPage }) {
  const pages = Array.from({ length: pagination.totalPages }, (_, i) => i + 1);
  const visible = pages.filter(
    (n) =>
      n === 1 ||
      n === pagination.totalPages ||
      Math.abs(n - pagination.page) <= 1,
  );

  const btnBase =
    "rounded px-3 py-1.5 text-xs font-medium text-black backdrop-blur-md transition hover:bg-white/[0.08] disabled:opacity-40";

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <button
        onClick={onPrev}
        disabled={!pagination.hasPrev}
        className={btnBase}
      >
        السابق
      </button>

      {visible.map((n, i, arr) => (
        <React.Fragment key={n}>
          {i > 0 && arr[i - 1] !== n - 1 && (
            <span className="text-xs text-black">…</span>
          )}
          <button
            onClick={() => onPage(n)}
            className={`min-w-[32px] rounded-lg border px-2 py-1.5 text-xs font-medium transition ${
              n === pagination.page
                ? "border-transparent bg-cyan-700 text-white shadow-[0_0_15px_-3px_rgba(44,167,124,0.7)]"
                : "border-white/10 bg-white/[0.04] text-black hover:bg-white/[0.08]"
            }`}
          >
            {n}
          </button>
        </React.Fragment>
      ))}

      <button
        onClick={onNext}
        disabled={!pagination.hasNext}
        className={btnBase}
      >
        التالي
      </button>
    </div>
  );
}
