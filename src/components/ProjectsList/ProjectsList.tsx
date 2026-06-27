import { SectionHeader } from "../SectionHeader/SectionHeader";
import { ProjectRow } from "../ProjectRow/ProjectRow";
import type { CardModel } from "../../lib/cards";
import styles from "./ProjectsList.module.css";

interface ProjectsListProps {
  id: string;
  icon: string;
  label: string;
  description?: string;
  cards: CardModel[];
  emptyMessage: string;
}

/** Section header + stacked full-bleed rows that alternate tone and image side. */
export function ProjectsList({
  id,
  icon,
  label,
  description,
  cards,
  emptyMessage,
}: ProjectsListProps) {
  return (
    <section id={id} className={styles.section} data-explodable>
      <div className={styles.headerBand}>
        <div className={styles.headerInner}>
          <SectionHeader
            icon={icon}
            label={label}
            description={description}
            tone="black"
          />
        </div>
      </div>

      {cards.length === 0 ? (
        <div className={styles.empty}>
          <p>{emptyMessage}</p>
        </div>
      ) : (
        cards.map((card, i) => (
          <ProjectRow
            key={card.id}
            card={card}
            index={i + 1}
            tone={i % 2 === 0 ? "cream" : "black"}
            imageSide={i % 2 === 0 ? "left" : "right"}
          />
        ))
      )}
    </section>
  );
}
