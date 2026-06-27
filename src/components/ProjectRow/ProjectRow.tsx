import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";
import { TagList } from "../TagList/TagList";
import { cx } from "../../lib/cx";
import { placeholderOnError } from "../../lib/image";
import type { CardModel } from "../../lib/cards";
import styles from "./ProjectRow.module.css";

interface ProjectRowProps {
  card: CardModel;
  /** Which side the cover image sits on. ("center" reserved for future use.) */
  imageSide?: "left" | "right" | "center";
  tone?: "black" | "cream";
  /** 1-based position, rendered as a big zero-padded index. */
  index?: number;
}

/** Full-bleed project/game row: big cover image on one side, varied info on the other. */
export function ProjectRow({
  card,
  imageSide = "left",
  tone = "cream",
  index,
}: ProjectRowProps) {
  const meta = [card.genre, card.year, card.typeLabel].filter(Boolean);

  return (
    <article
      className={cx(styles.row, styles[tone], styles[imageSide])}
      data-explodable
    >
      <div className={styles.media}>
        <img
          src={card.image}
          alt={card.title}
          onError={placeholderOnError(card.title)}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.topline}>
          {index != null && (
            <span className={styles.index}>
              {String(index).padStart(2, "0")}
            </span>
          )}
          <Badge badge={card.badge} inDevelopment={card.inDevelopment} />
        </div>
        <h3 className={styles.title}>{card.title}</h3>
        {meta.length > 0 && (
          <p className={styles.meta}>{meta.join("  //  ")}</p>
        )}
        <p className={styles.desc}>{card.description}</p>
        <TagList tags={card.tags} />
        {card.links.length > 0 && (
          <div className={styles.links}>
            {card.links.map((link) => (
              <Button key={link.label} href={link.href} variant={link.variant}>
                {link.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
