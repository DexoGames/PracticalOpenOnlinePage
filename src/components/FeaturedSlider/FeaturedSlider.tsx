import { useEffect, useMemo, useRef, useState } from "react";
import { GAMES_DATA } from "../../data/games";
import { PROJECTS_DATA } from "../../data/projects";
import { gameToCard, projectToCard, type CardModel } from "../../lib/cards";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import { ProjectRow } from "../ProjectRow/ProjectRow";
import styles from "./FeaturedSlider.module.css";

/** Ordered featured cards, drawn from games + projects flagged `featured`. */
function buildFeaturedCards(): CardModel[] {
  const games = GAMES_DATA.filter((g) => g.featured).map((g) => ({
    order: g.featuredOrder ?? 999,
    card: gameToCard(g),
  }));
  const projects = PROJECTS_DATA.filter((p) => p.featured).map((p) => ({
    order: p.featuredOrder ?? 999,
    card: projectToCard(p),
  }));
  return [...games, ...projects]
    .sort((a, b) => a.order - b.order)
    .map((e) => e.card);
}

const pad = (n: number) => String(n).padStart(2, "0");

export function FeaturedSlider() {
  const cards = useMemo(buildFeaturedCards, []);
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % cards.length);
    }, 6000);
  };

  useEffect(() => {
    if (cards.length <= 1) return;
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [cards.length]);

  if (cards.length === 0) return null;

  const goPrev = () => { setIndex((i) => (i - 1 + cards.length) % cards.length); resetTimer(); };
  const goNext = () => { setIndex((i) => (i + 1) % cards.length); resetTimer(); };

  return (
    <section id="featured" className={styles.section} data-explodable>
      <div className={styles.headerBand}>
        <div className={styles.headerInner}>
          <SectionHeader
            icon="fa-star"
            label="Featured Work"
            description="My best and most relevant work."
            tone="black"
          />
        </div>
      </div>

      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {cards.map((card) => (
            <div className={styles.slide} key={card.id}>
              <ProjectRow card={card} tone="black" imageSide="left" />
            </div>
          ))}
        </div>
      </div>

      {cards.length > 1 && (
        <div className={styles.controls}>
          <span className={styles.counter}>
            {pad(index + 1)} <span className={styles.slash}>/</span>{" "}
            {pad(cards.length)}
          </span>
          <div className={styles.btns}>
            <button onClick={goPrev} aria-label="Previous featured">
              <i className="fas fa-arrow-left"></i>
            </button>
            <button onClick={goNext} aria-label="Next featured">
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
