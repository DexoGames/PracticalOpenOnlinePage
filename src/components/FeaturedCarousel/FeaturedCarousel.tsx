import { useEffect, useMemo, useState } from "react";
import { GAMES_DATA } from "../../data/games";
import { PROJECTS_DATA } from "../../data/projects";
import { gameToCard, projectToCard, type CardModel } from "../../lib/cards";
import { cx } from "../../lib/cx";
import { placeholderOnError } from "../../lib/image";
import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";
import { SectionTitle } from "../SectionTitle/SectionTitle";
import { TagList } from "../TagList/TagList";
import styles from "./FeaturedCarousel.module.css";

const ROTATE_MS = 6000;

/** Builds the ordered list of featured cards from games + projects. */
function buildFeaturedCards(): CardModel[] {
  const featuredGames = GAMES_DATA.filter((g) => g.featured).map((g) => ({
    order: g.featuredOrder ?? 999,
    card: gameToCard(g),
  }));
  const featuredProjects = PROJECTS_DATA.filter((p) => p.featured).map((p) => ({
    order: p.featuredOrder ?? 999,
    card: projectToCard(p),
  }));

  return [...featuredGames, ...featuredProjects]
    .sort((a, b) => a.order - b.order)
    .map((entry) => entry.card);
}

export function FeaturedCarousel() {
  const cards = useMemo(buildFeaturedCards, []);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-rotate; the timer restarts whenever the index changes (manual nav)
  // or when hovering pauses it — matching the original behaviour.
  useEffect(() => {
    if (paused || cards.length <= 1) return;
    const t = setTimeout(
      () => setIndex((i) => (i + 1) % cards.length),
      ROTATE_MS,
    );
    return () => clearTimeout(t);
  }, [index, paused, cards.length]);

  if (cards.length === 0) return null;

  const card = cards[index];
  const goPrev = () => setIndex((i) => (i - 1 + cards.length) % cards.length);
  const goNext = () => setIndex((i) => (i + 1) % cards.length);

  return (
    <section id="featured" className={styles.featured} data-explodable>
      <SectionTitle>Featured Work</SectionTitle>
      <div
        className={styles.carousel}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <button
          className={cx(styles.carouselBtn, styles.prev)}
          onClick={goPrev}
          aria-label="Previous"
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        <div className={styles.card}>
          <div className={styles.content}>
            <div className={styles.image}>
              <img
                src={card.image}
                alt={card.title}
                onError={placeholderOnError(card.title)}
              />
            </div>
            <div className={styles.info}>
              <div className={styles.titleRow}>
                <h3>{card.title}</h3>
                <Badge
                  badge={card.badge}
                  inDevelopment={card.inDevelopment}
                  className={styles.badge}
                />
              </div>
              <span className={styles.type}>{card.typeLabel}</span>
              <p className={styles.description}>{card.description}</p>
              <TagList tags={card.tags} compact />
              <div className={styles.links}>
                {card.links.map((link) => (
                  <Button
                    key={link.label}
                    href={link.href}
                    variant={link.variant}
                    className={styles.btn}
                  >
                    {link.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          className={cx(styles.carouselBtn, styles.next)}
          onClick={goNext}
          aria-label="Next"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      <div className={styles.dots}>
        {cards.map((c, i) => (
          <button
            key={c.id}
            className={cx(styles.dot, i === index && styles.active)}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
