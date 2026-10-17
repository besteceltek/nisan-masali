export function Corner({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" aria-hidden="true">
      <path d="M4 4h72v16H20v56H4V4z" fill="#1b3526" />
      <path d="M4 4h72v16H20v56H4V4z" fill="none" stroke="#e6c97a" strokeWidth="1.5" />
      <path d="M11 11h56" stroke="#f3dd9a" strokeWidth="0.8" />
      <path d="M11 11v56" stroke="#f3dd9a" strokeWidth="0.8" />
      <path
        d="M32 30c9-9 24-2 21 12-8-1-15 3-20 11 1-9-1-16-1-23z"
        fill="#6d8f52"
        stroke="#2a2116"
        strokeWidth="0.7"
      />
      <circle cx="27" cy="25" r="4.2" fill="#7c2a28" />
      <circle cx="27" cy="25" r="1.6" fill="#f0d48a" />
    </svg>
  );
}

export function Rule() {
  return (
    <div className="rule" aria-hidden="true">
      <i />
    </div>
  );
}
