import { Section } from "../Section/Section";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import type { CardModel } from "../../lib/cards";
import styles from "./ProjectsGrid.module.css";

interface ProjectsGridProps {
  id: string;
  title: string;
  cards: CardModel[];
  emptyMessage: string;
}

/** A titled section containing a responsive grid of project/game cards. */
export function ProjectsGrid({ id, title, cards, emptyMessage }: ProjectsGridProps) {
  return (
    <Section id={id} title={title}>
      <div className={styles.grid}>
        {cards.length === 0 ? (
          <p className={styles.noContent}>{emptyMessage}</p>
        ) : (
          cards.map((card) => <ProjectCard key={card.id} card={card} />)
        )}
      </div>
    </Section>
  );
}
