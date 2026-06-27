import { cx } from "../../lib/cx";
import styles from "./TagList.module.css";

interface TagListProps {
  tags: string[];
  /** Smaller spacing/type used inside the featured carousel card. */
  compact?: boolean;
}

/** Row of small pill tags (the old .project-tags). */
export function TagList({ tags, compact }: TagListProps) {
  return (
    <div className={cx(styles.tags, compact && styles.compact)}>
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}
