import { ENTRY_TYPE_CONFIG, type EntryType } from "@/lib/types";

interface EntryBadgeProps {
  type: EntryType;
  size?: "sm" | "md";
}

export function EntryBadge({ type, size = "md" }: EntryBadgeProps) {
  const config = ENTRY_TYPE_CONFIG[type];
  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5" : "text-xs px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium border ${config.color} ${config.bgColor} ${config.borderColor} ${sizeClasses}`}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
}
