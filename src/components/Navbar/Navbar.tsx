import type { MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "../../lib/scroll";
import { useNavBrandTyper } from "../../hooks/useNavBrandTyper";
import styles from "./Navbar.module.css";

// Stable references so the typer effect doesn't restart on every render.
const BRAND_SUFFIXES = ["Games", "Software", "Photos", "Smith"];
const BRAND_HOLD_TIMES = [8000, 3000, 3000, 3000, 3000];

interface NavItem {
  label: string;
  hash?: string;
  href?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "About", hash: "#about" },
  { label: "Games", hash: "#games" },
  { label: "Projects", hash: "#projects" },
  { label: "Photos", href: "https://photos.dexo.games" },
  { label: "Contact", hash: "#contact" },
];

interface NavbarProps {
  /** "home" animates the brand suffix; "photos" shows a static brand. */
  variant?: "home" | "photos";
}

export function Navbar({ variant = "home" }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const typedSuffix = useNavBrandTyper(BRAND_SUFFIXES, BRAND_HOLD_TIMES);
  const brandSuffix = variant === "photos" ? "Photos" : typedSuffix;

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (location.pathname === "/") {
      scrollToSection(hash);
    } else {
      navigate(`/${hash}`);
    }
  };

  return (
    <nav className={styles.navbar} data-explodable>
      <div className={styles.left}>
        <span className={styles.status}>
          <span className={styles.dot}></span>Available
        </span>
        <span className={styles.brand}>
          Dexo.<span className={styles.brandSuffix}>{brandSuffix}</span>
        </span>
      </div>

      <ul className={styles.links}>
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                {item.label}
              </a>
            ) : (
              <a href={item.hash} onClick={(e) => handleNavClick(e, item.hash!)}>
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={styles.cta}
        onClick={(e) => handleNavClick(e, "#contact")}
      >
        Get in touch
      </a>
    </nav>
  );
}
