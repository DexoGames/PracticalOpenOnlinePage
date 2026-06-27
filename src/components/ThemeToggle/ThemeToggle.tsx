import { useTheme } from "../../context/ThemeContext";
import styles from "./ThemeToggle.module.css";

/** Moon/sun button that toggles the colour theme. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      className={styles.themeToggle}
      title="Toggle dark/light mode"
      onClick={toggleTheme}
      aria-label="Toggle dark/light mode"
    >
      <i className={`fas ${theme === "light" ? "fa-sun" : "fa-moon"}`}></i>
    </button>
  );
}
