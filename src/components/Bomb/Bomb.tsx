import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cx } from "../../lib/cx";
import styles from "./Bomb.module.css";

const START_TIME = 60;

/**
 * The "defuse the bomb" gimmick. A 60s countdown (persisted across reloads and
 * route changes) that — if it reaches zero — flings the page apart. Mounted once
 * outside the page-wrapper so it survives navigation and isn't blown up itself.
 */
export function Bomb() {
  const [timeLeft, setTimeLeft] = useState(START_TIME);
  const [critical, setCritical] = useState(false);
  const [timerColor, setTimerColor] = useState<string | undefined>(undefined);
  const [defuseLabel, setDefuseLabel] = useState("DEFUSE");
  const [defuseStyle, setDefuseStyle] = useState<CSSProperties>({});

  const timeLeftRef = useRef(START_TIME);
  const isExplodedRef = useRef(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const defuseRef = useRef<() => void>(() => {});

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let defuseTimer: ReturnType<typeof setTimeout>;

    const saveTimerState = () => {
      try {
        localStorage.setItem("bombTimeLeft", String(timeLeftRef.current));
        localStorage.setItem("bombTimestamp", String(Date.now()));
      } catch {
        /* ignore */
      }
    };

    const clearTimerState = () => {
      try {
        localStorage.removeItem("bombTimeLeft");
        localStorage.removeItem("bombTimestamp");
      } catch {
        /* ignore */
      }
    };

    const loadTimerState = () => {
      let saved: string | null = null;
      let savedTs: string | null = null;
      try {
        saved = localStorage.getItem("bombTimeLeft");
        savedTs = localStorage.getItem("bombTimestamp");
      } catch {
        /* ignore */
      }
      if (saved && savedTs) {
        const elapsed = Math.floor((Date.now() - parseInt(savedTs)) / 1000);
        const calculated = Math.max(0, parseInt(saved) - elapsed);
        // Reset at zero so the page doesn't stay permanently exploded.
        if (calculated <= 0) {
          clearTimerState();
          timeLeftRef.current = START_TIME;
          isExplodedRef.current = false;
          return;
        }
        timeLeftRef.current = calculated;
      }
    };

    // Grab only the elements near the viewport, otherwise fps tanks mid-explosion.
    const getExplodableElements = (): HTMLElement[] => {
      const wrapper = document.getElementById("pageWrapper");
      if (!wrapper) return [];
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const buffer = viewportHeight;
      const all = wrapper.querySelectorAll<HTMLElement>(
        "[data-explodable], h1, h2, h3, p, img, a, button",
      );
      return Array.from(all).filter((el) => {
        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY;
        const bottom = top + rect.height;
        const visibleTop = scrollY - buffer;
        const visibleBottom = scrollY + viewportHeight + buffer;
        return bottom > visibleTop && top < visibleBottom;
      });
    };

    const explode = () => {
      isExplodedRef.current = true;
      const overlay = overlayRef.current;
      const container = containerRef.current;

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      if (overlay) overlay.classList.add(styles.active);

      document.body.style.transition = "background 1s ease";
      document.body.style.background =
        "linear-gradient(135deg, #2a0a0a, #4a1010, #2a0a0a)";

      setTimeout(() => {
        if (overlay) {
          overlay.style.transition = "opacity 1.5s ease";
          overlay.style.opacity = "0";
        }
      }, 400);

      const elements = getExplodableElements();
      const wrapper = document.getElementById("pageWrapper");
      if (wrapper) wrapper.style.pointerEvents = "none";

      // Batch reads then writes so the animation stays smooth.
      const elementData = elements.map((el) => ({
        el,
        rect: el.getBoundingClientRect(),
      }));

      const animations = elementData.map((_, index) => ({
        angle: Math.random() * 360,
        distance: 800 + Math.random() * 2000,
        rotateAmount: (Math.random() - 0.5) * 1440,
        duration: 0.8 + Math.random() * 1.5,
        opacityDuration: 1.5 + Math.random(),
        scale: Math.random() * 0.3,
        delay: index * 15,
      }));

      elementData.forEach(({ el }) => {
        el.style.willChange = "transform, opacity";
      });

      requestAnimationFrame(() => {
        elementData.forEach(({ el }, index) => {
          const anim = animations[index];
          setTimeout(() => {
            const x = Math.cos((anim.angle * Math.PI) / 180) * anim.distance;
            const y =
              Math.sin((anim.angle * Math.PI) / 180) * anim.distance + 1500;
            el.style.transition = `transform ${anim.duration}s ease-out, opacity ${anim.opacityDuration}s ease-out`;
            el.style.transform = `translate(${x}px, ${y}px) rotate(${anim.rotateAmount}deg) scale(${anim.scale})`;
            el.style.opacity = "0";
          }, anim.delay);
        });

        setTimeout(() => {
          elementData.forEach(({ el }) => {
            el.style.willChange = "auto";
          });
        }, 3000);
      });

      if (container) {
        container.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        container.style.opacity = "0";
        container.style.transform = "scale(0.8)";
        setTimeout(() => {
          container.style.display = "none";
        }, 500);
      }
    };

    const tick = () => {
      timeLeftRef.current -= 1;
      setTimeLeft(timeLeftRef.current);
      saveTimerState();

      if (timeLeftRef.current <= 10) {
        setCritical(true);
        setTimerColor("#ff0000");
      }

      if (timeLeftRef.current <= 5) {
        document.getElementById("pageWrapper")?.classList.add("shake");
      }

      if (timeLeftRef.current <= 0) {
        clearInterval(interval);
        saveTimerState();
        explode();
      }
    };

    // --- init ---
    loadTimerState();
    setTimeLeft(timeLeftRef.current);
    if (timeLeftRef.current <= 10) {
      setCritical(true);
      setTimerColor("#ff0000");
    }
    interval = setInterval(tick, 1000);

    // Expose defuse to the click handler via the ref-backed closure.
    defuseRef.current = () => {
      if (isExplodedRef.current) return;
      timeLeftRef.current = START_TIME;
      setTimeLeft(START_TIME);
      setTimerColor("#00ff00");
      setCritical(false);
      document.getElementById("pageWrapper")?.classList.remove("shake");
      clearTimerState();
      isExplodedRef.current = false;

      setDefuseLabel("DEFUSED!");
      setDefuseStyle({ background: "linear-gradient(135deg, #00ff00, #00aa00)" });
      clearTimeout(defuseTimer);
      defuseTimer = setTimeout(() => {
        setDefuseLabel("DEFUSE");
        setDefuseStyle({});
      }, 1000);
    };

    return () => {
      clearInterval(interval);
      clearTimeout(defuseTimer);
    };
  }, []);

  return (
    <>
      <div
        className={cx(styles.bombContainer, critical && styles.critical)}
        ref={containerRef}
      >
        <div className={styles.bombDisplay}>
          <div className={styles.timer} style={{ color: timerColor }}>
            {timeLeft}
          </div>
          <button
            className={styles.defuseBtn}
            style={defuseStyle}
            onClick={() => defuseRef.current()}
          >
            {defuseLabel}
          </button>
        </div>
        <div className={styles.bombWarning}>Reset before detonation!</div>
      </div>
      <div className={styles.explosionOverlay} ref={overlayRef}></div>
    </>
  );
}
