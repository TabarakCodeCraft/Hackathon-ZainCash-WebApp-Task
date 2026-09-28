
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
};


export function PlusIcon({ className = "h-4 w-4", ...rest }) {
  return (
    <svg {...base} className={className} {...rest}>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SearchIcon({ className = "h-4 w-4", ...rest }) {
  return (
    <svg {...base} className={className} {...rest}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m20 20-3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CloseIcon({ className = "h-[18px] w-[18px]", ...rest }) {
  return (
    <svg {...base} className={className} {...rest}>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SparklesIcon({ className = "h-4 w-4", ...rest }) {
  return (
    <svg {...base} className={className} {...rest}>
      <path
        d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z"
        fill="currentColor"
      />
      <path
        d="M18.5 14l.8 2.2L21.5 17l-2.2.8-.8 2.2-.8-2.2L15.5 17l2.2-.8.8-2.2z"
        fill="currentColor"
        opacity=".85"
      />
    </svg>
  );
}

export function TicketIcon({ className = "h-4 w-4", ...rest }) {
  return (
    <svg {...base} className={className} {...rest}>
      <path
        d="M4 9.2c0-1 .8-1.7 1.7-1.7h12.6c.9 0 1.7.8 1.7 1.7v1.3a1.9 1.9 0 0 0 0 3v1.3c0 1-.8 1.7-1.7 1.7H5.7A1.7 1.7 0 0 1 4 14.8v-1.3a1.9 1.9 0 0 0 0-3V9.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M10 7.5v9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeDasharray="1.8 1.8"
      />
    </svg>
  );
}

export function CheckIcon({ className = "h-4 w-4", ...rest }) {
  return (
    <svg {...base} className={className} {...rest}>
      <path
        d="m5 12.5 4.2 4.2L19 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InfoIcon({ className = "h-4 w-4", ...rest }) {
  return (
    <svg {...base} className={className} {...rest}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 8h.01M11 12h1v4h1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}


export function TagIcon({ className = "h-3.5 w-3.5", ...rest }) {
  return (
    <svg {...base} className={className} {...rest}>
      <path
        d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="7.5" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function FlagIcon({ className = "h-3.5 w-3.5", ...rest }) {
  return (
    <svg {...base} className={className} {...rest}>
      <path
        d="M5 21V4m0 0h11l-2 4 2 4H5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GaugeIcon({ className = "h-3.5 w-3.5", ...rest }) {
  return (
    <svg {...base} className={className} {...rest}>
      <path
        d="M4 15a8 8 0 1 1 16 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="m12 15 4-5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="12" cy="15" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function DeptIcon({ className = "h-3.5 w-3.5", ...rest }) {
  return (
    <svg {...base} className={className} {...rest}>
      <path
        d="M4 20V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14M16 11h3a1 1 0 0 1 1 1v8M2 20h20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 8h4M8 12h4M8 16h4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DatabaseIcon({ className = "h-3.5 w-3.5", ...rest }) {
  return (
    <svg {...base} className={className} {...rest}>
      <ellipse
        cx="12"
        cy="6"
        rx="8"
        ry="3"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function ChartIcon({ className = "h-3.5 w-3.5", ...rest }) {
  return (
    <svg {...base} className={className} {...rest}>
      <path
        d="M4 20V10M10 20V4M16 20v-7M22 20H2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AlertIcon({ className = "h-4 w-4", ...rest }) {
  return (
    <svg {...base} className={className} {...rest}>
      <path
        d="M12 3 2.5 20h19L12 3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M12 9v5M12 17.5h.01"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DocIcon({ className = "h-3.5 w-3.5", ...rest }) {
  return (
    <svg {...base} className={className} {...rest}>
      <path
        d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M14 3v5h5M8 13h8M8 17h6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
