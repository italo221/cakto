import type { SimpleIcon } from "simple-icons";

export function BrandIcon({
  icon,
  className,
  colored = false,
  title,
}: {
  icon: SimpleIcon;
  className?: string;
  colored?: boolean;
  title?: string;
}) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      fill={colored ? `#${icon.hex}` : "currentColor"}
      aria-label={title ?? icon.title}
    >
      <title>{title ?? icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}
