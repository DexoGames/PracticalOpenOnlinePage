import type { ReactNode } from "react";
import { cx } from "../../lib/cx";
import { SectionTitle } from "../SectionTitle/SectionTitle";
import styles from "./Section.module.css";

interface SectionProps {
  id: string;
  title?: string;
  className?: string;
  children: ReactNode;
}

/** Standard page section: centred max-width column with an optional title. */
export function Section({ id, title, className, children }: SectionProps) {
  return (
    <section id={id} className={cx(styles.section, className)} data-explodable>
      {title && <SectionTitle>{title}</SectionTitle>}
      {children}
    </section>
  );
}
