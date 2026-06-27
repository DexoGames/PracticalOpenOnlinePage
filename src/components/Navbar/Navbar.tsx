import type { MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cx } from "../../lib/cx";
import { scrollToSection } from "../../lib/scroll";
import { useNavBrandTyper } from "../../hooks/useNavBrandTyper";
import { useScrolled } from "../../hooks/useScrolled";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import styles from "./Navbar.module.css";

// Stable references so the typer effect doesn't restart on every render.
const BRAND_SUFFIXES = ["Games", "Software", "Photos", "Smith"];
const BRAND_HOLD_TIMES = [8000, 3000, 3000, 3000, 3000];

const NAV_ITEMS = [
  { label: "About", hash: "#about" },
  { label: "Games", hash: "#games" },
  { label: "Projects", hash: "#projects" },
  { label: "Photos", hash: "#photos" },
  { label: "Contact", hash: "#contact" },
];

interface NavbarProps {
  /** "home" animates the brand and reacts to scroll; "photos" is static. */
  variant?: "home" | "photos";
}

export function Navbar({ variant = "home" }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const typedSuffix = useNavBrandTyper(BRAND_SUFFIXES, BRAND_HOLD_TIMES);

  // The photos page renders a static brand and a permanently-scrolled bar.
  const scrolledByPosition = useScrolled(50);
  const scrolled = variant === "photos" ? true : scrolledByPosition;
  const brandSuffix = variant === "photos" ? "Photos" : typedSuffix;

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (location.pathname === "/") {
      scrollToSection(hash);
    } else {
      // Navigate home, then HomePage scrolls to the hash on mount.
      navigate(`/${hash}`);
    }
  };

  return (
    <nav className={cx(styles.navbar, scrolled && styles.scrolled)} data-explodable>
      <div className={styles.brand}>
        Dexo.<span>{brandSuffix}</span>
      </div>
      <ul className={styles.links}>
        {NAV_ITEMS.map((item) => (
          <li key={item.hash}>
            <a href={item.hash} onClick={(e) => handleNavClick(e, item.hash)}>
              {item.label}
            </a>
          </li>
        ))}
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  );
}
