import { cx } from "../../lib/cx";
import type { Badge as BadgeData } from "../../types/content";
import styles from "./Badge.module.css";

interface BadgeProps {
  /** Custom badge (text + icon). Takes priority over inDevelopment. */
  badge?: BadgeData;
  /** Shows the default "In Development" badge when no custom badge is set. */
  inDevelopment?: boolean;
  /** Compact, statically-positioned variant used inside card title rows. */
  inline?: boolean;
  /** Extra class for context-specific overrides (e.g. featured card). */
  className?: string;
}

/** The orange dev/award pill. Renders nothing when there's nothing to show. */
export function Badge({ badge, inDevelopment, inline, className }: BadgeProps) {
  let icon: string;
  let text: string;
  let isAward = false;

  if (badge) {
    icon = badge.icon || "fa-star";
    text = badge.text;
    isAward = true;
  } else if (inDevelopment) {
    icon = "fa-code";
    text = "In Development";
  } else {
    return null;
  }

  return (
    <span
      className={cx(
        styles.devBadge,
        isAward && styles.award,
        inline && styles.inline,
        className,
      )}
    >
      <i className={`fas ${icon}`}></i> {text}
    </span>
  );
}
