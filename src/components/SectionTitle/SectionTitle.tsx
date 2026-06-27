import { cx } from "../../lib/cx";
import styles from "./SectionTitle.module.css";

interface SectionTitleProps {
  children: string;
  className?: string;
}

/** Centred heading with the accent underline (the old .section-title). */
export function SectionTitle({ children, className }: SectionTitleProps) {
  return <h2 className={cx(styles.sectionTitle, className)}>{children}</h2>;
}
