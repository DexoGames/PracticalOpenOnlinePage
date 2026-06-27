import type { MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PROFILE_DATA } from "../../data/profile";
import { SOCIALS_DATA } from "../../data/socials";
import { scrollToSection } from "../../lib/scroll";
import styles from "./Footer.module.css";

const NAV_ITEMS = [
  { label: "Home", hash: "#hero" },
  { label: "About", hash: "#about" },
  { label: "Games", hash: "#games" },
  { label: "Projects", hash: "#projects" },
  { label: "Photos", hash: "#photos" },
  { label: "Contact", hash: "#contact" },
];

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const go = (e: MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (location.pathname === "/") scrollToSection(hash);
    else navigate(`/${hash}`);
  };

  const externalSocials = SOCIALS_DATA.filter((s) => s.url);

  return (
    <footer className={styles.footer} data-explodable>
      <div className={styles.inner}>
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Navigate</h4>
          {NAV_ITEMS.map((item) => (
            <a key={item.hash} href={item.hash} onClick={(e) => go(e, item.hash)}>
              {item.label}
            </a>
          ))}
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Elsewhere</h4>
          {externalSocials.map((s) => (
            <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer">
              {s.name}
            </a>
          ))}
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Get in touch</h4>
          <a href={`mailto:${PROFILE_DATA.email}`}>{PROFILE_DATA.email}</a>
          <Link to="/photos">Photo gallery</Link>
        </div>

        <div className={styles.meta}>
          <p>
            &copy; {PROFILE_DATA.footerYear} {PROFILE_DATA.name}.
            <br />
            All rights reserved.
          </p>
          <p className={styles.tagline}>{PROFILE_DATA.footerText}</p>
        </div>
      </div>

      <div className={styles.bigNameWrap} aria-hidden="true">
        <span className={styles.bigName}>{PROFILE_DATA.name}</span>
      </div>
    </footer>
  );
}
