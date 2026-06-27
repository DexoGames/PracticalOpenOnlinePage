import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";
import { TagList } from "../TagList/TagList";
import { placeholderOnError } from "../../lib/image";
import type { CardModel } from "../../lib/cards";
import styles from "./ProjectCard.module.css";

/** Grid card for a game or project. */
export function ProjectCard({ card }: { card: CardModel }) {
  return (
    <div className={styles.card} data-id={card.id} data-explodable>
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
          <Badge badge={card.badge} inDevelopment={card.inDevelopment} inline />
        </div>
        <span className={styles.type}>{card.typeLabel}</span>
        <p className={styles.description}>{card.description}</p>
        <TagList tags={card.tags} />
        <div className={styles.links}>
          {card.links.map((link) => (
            <Button key={link.label} href={link.href} variant={link.variant}>
              {link.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
