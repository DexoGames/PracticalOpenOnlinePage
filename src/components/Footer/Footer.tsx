import { PROFILE_DATA } from "../../data/profile";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer} data-explodable>
      <p>
        &copy; {PROFILE_DATA.footerYear} {PROFILE_DATA.name}. All rights reserved.
      </p>
      <p>{PROFILE_DATA.footerText}</p>
    </footer>
  );
}
