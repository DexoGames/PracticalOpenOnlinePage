import type { ReactNode } from "react";
import { cx } from "../../lib/cx";
import styles from "./Button.module.css";

interface ButtonProps {
  href: string;
  variant?: "primary" | "secondary";
  /** Open in a new tab with safe rel. Defaults to true. */
  external?: boolean;
  /** Extra class for context-specific sizing (e.g. featured carousel). */
  className?: string;
  children: ReactNode;
}

/** Link styled as a button (btn / btn-primary / btn-secondary). */
export function Button({
  href,
  variant = "primary",
  external = true,
  className,
  children,
}: ButtonProps) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <a
      href={href}
      className={cx(styles.btn, styles[variant], className)}
      {...externalProps}
    >
      {children}
    </a>
  );
}
