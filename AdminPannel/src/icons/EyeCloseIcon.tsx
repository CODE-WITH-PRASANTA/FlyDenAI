// src/icons/EyeCloseIcon.tsx
import React from "react";

export default function EyeCloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-6 0-10-7-10-7 .97-1.71 2.2-3.2 3.64-4.4" />
      <path d="M1 1l22 22" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
