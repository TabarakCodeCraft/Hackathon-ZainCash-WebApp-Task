export const CATEGORY_LABELS = {
  failed_transfer: "تحويل فاشل",
  wrong_recipient: "مستلم خاطئ",
  payment_pending: "دفعة معلّقة",
  login_problem: "مشكلة دخول",
  card_issue: "مشكلة بطاقة",
  account_issue: "مشكلة حساب",
  agent_dispute: "نزاع مع وكيل",
  other: "أخرى",
};

export const DEPARTMENT_LABELS = {
  Payment: "قسم الدفع والمبيعات",
  Technical: "القسم التقني",
  Account: "قسم الحسابات",
  Driver: "قسم التوصيل والسواق",
};

export const PRIORITY_LABELS = {
  low: "منخفضة",
  medium: "متوسطة",
  high: "عالية",
  critical: "حرجة",
};

export const PRIORITY_TONES = {
  low: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30",
  medium: "bg-amber-500/15 text-amber-200 ring-amber-400/30",
  high: "bg-orange-500/15 text-orange-200 ring-orange-400/30",
  critical: "bg-red-500/15 text-red-200 ring-red-400/30",
};

export const ENTITY_LABELS = {
  amount: "المبلغ",
  transaction_id: "رقم العملية",
  recipient: "المستلم",
  account_id: "رقم الحساب",
  date: "التاريخ",
};

export const CATEGORIES = [
  { value: "failed_transfer", label: "تحويل فاشل" },
  { value: "wrong_recipient", label: "مستلم خاطئ" },
  { value: "payment_pending", label: "دفعة معلّقة" },
  { value: "login_problem", label: "مشكلة دخول" },
  { value: "card_issue", label: "مشكلة بطاقة" },
  { value: "account_issue", label: "مشكلة حساب" },
  { value: "agent_dispute", label: "نزاع مع وكيل" },
  { value: "other", label: "أخرى" },
];

export const PRIORITIES = [
  { value: "low", label: "منخفضة" },
  { value: "medium", label: "متوسطة" },
  { value: "high", label: "عالية" },
  { value: "critical", label: "حرجة" },
];

export const STATUSES = [
  { value: "pending", label: "قيد المعالجة" },
  { value: "approved", label: "مقبولة" },
  { value: "rejected", label: "مرفوضة" },
];