import type { Badge, Game, Project } from "../types/content";

export interface CardLink {
  label: string;
  href: string;
  variant: "primary" | "secondary";
}

/** Normalised shape rendered by ProjectRow and the featured slider. */
export interface CardModel {
  id: string;
  title: string;
  image: string;
  typeLabel: string;
  description: string;
  tags: string[];
  inDevelopment: boolean;
  badge?: Badge;
  links: CardLink[];
  /** Optional metadata surfaced as `genre · year · platform` annotations. */
  year?: string;
  genre?: string;
}

function platformLabel(platform?: string): string {
  if (platform === "mobile") return "Mobile Game";
  if (platform === "pc") return "PC Game";
  return "Game";
}

export function gameToCard(game: Game): CardModel {
  const links: CardLink[] = [];
  if (game.links.play)
    links.push({ label: "Play Now", href: game.links.play, variant: "primary" });
  if (game.links.source)
    links.push({ label: "View Source", href: game.links.source, variant: "secondary" });

  return {
    id: game.id,
    title: game.title,
    image: game.image,
    typeLabel: platformLabel(game.platform),
    description: game.description,
    tags: game.tags,
    inDevelopment: !!game.inDevelopment,
    links,
    year: game.year,
    genre: game.genre,
  };
}

export function projectToCard(project: Project): CardModel {
  const links: CardLink[] = [];
  if (project.links.play)
    links.push({ label: "Play Now", href: project.links.play, variant: "primary" });
  if (project.links.demo)
    links.push({ label: "Live Demo", href: project.links.demo, variant: "primary" });
  if (project.links.github)
    links.push({ label: "GitHub", href: project.links.github, variant: "secondary" });

  return {
    id: project.id,
    title: project.title,
    image: project.image,
    typeLabel: project.subtext || "Project",
    description: project.description,
    tags: project.tags,
    inDevelopment: !!project.inDevelopment,
    badge: project.badge,
    links,
  };
}
