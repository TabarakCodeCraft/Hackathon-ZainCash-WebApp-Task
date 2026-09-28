import React from "react";
import {
  CATEGORIES,
  PRIORITIES,
  STATUSES,
} from "../../constants/complaintLabels";

const priorityStyles = {
  high: "bg-[#FEF2F2] text-[#B42318] ring-1 ring-inset ring-[#FCA5A5]",
  medium: "bg-[#FFFBEB] text-[#B54708] ring-1 ring-inset ring-[#FDE68A]",
  low: "bg-[#ECFDF5] text-[#05603A] ring-1 ring-inset ring-[#A7F3D0]",
};

const priorityDot = {
  high: "bg-[#D92D20]",
  medium: "bg-[#DC6803]",
  low: "bg-[#039855]",
};

const statusStyles = {
  pending: "bg-[#EFF1F5] text-[#364152] ring-1 ring-inset ring-[#D0D5DD]",
  approved: "bg-[#ECFDF9] text-[#0C5C53] ring-1 ring-inset ring-[#99E6DC]",
  rejected: "bg-[#FEF2F2] text-[#B42318] ring-1 ring-inset ring-[#FCA5A5]",
};

function findLabel(list, value) {
  return list.find((i) => i.value === value)?.label || value || "—";
}

export function PriorityBadge({ value }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors duration-150 ${
        priorityStyles[value] || priorityStyles.low
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${priorityDot[value] || priorityDot.low}`}
      />
      {findLabel(PRIORITIES, value)}
    </span>
  );
}

export function StatusBadge({ value }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium transition-colors duration-150 ${
        statusStyles[value] || statusStyles.pending
      }`}
    >
      {findLabel(STATUSES, value)}
    </span>
  );
}

export function CategoryTag({ value }) {
  return (
    <span className="inline-flex items-center rounded-md border border-[#E4E7EC] bg-white px-2 py-1 text-xs font-medium text-[#344054]">
      {findLabel(CATEGORIES, value)}
    </span>
  );
}
