import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function CardIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 9.5h19" />
      <path d="M6 14.5h4" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 5 6v5c0 4.2 2.9 7.5 7 9 4.1-1.5 7-4.8 7-9V6l-7-3Z" />
      <path d="m9.2 11.8 1.9 1.9 3.7-3.8" />
    </svg>
  );
}

export function SplitIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6h5l4 6h7" />
      <path d="M4 18h5l2.5-3.7" />
      <path d="m17 9 3 3-3 3" />
    </svg>
  );
}

export function ChartIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4v16h16" />
      <path d="M8 15v2" />
      <path d="M12 11v6" />
      <path d="M16 7v10" />
    </svg>
  );
}

export function BoltIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13 3 5 13h5l-1 8 8-10h-5l1-8Z" />
    </svg>
  );
}

export function LinkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9.5 14.5 14.5 9.5" />
      <path d="M8 11 6 13a3.5 3.5 0 0 0 5 5l2-2" />
      <path d="M16 13l2-2a3.5 3.5 0 0 0-5-5l-2 2" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12.5 4.2 4.5L19 7" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
      >
        <rect width="28" height="28" rx="8" className="fill-brand-500" />
        <path
          d="M18.5 11.2a4.6 4.6 0 1 0 0 5.6"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span className="text-[19px] font-semibold tracking-tight text-ink">
        Cakto
      </span>
    </span>
  );
}
