// Shared content types. The data files in src/data/* are the single source of
// truth for site content — edit those to update the site.

export interface ProjectLinks {
  /** Game: store / play link. Project: primary play link. */
  play?: string;
  /** Game: source-code link. */
  source?: string;
  /** Project: live demo link. */
  demo?: string;
  /** Project: GitHub repository link. */
  github?: string;
}

export interface Badge {
  text: string;
  /** Font Awesome icon class, e.g. "fa-trophy". Defaults to "fa-star". */
  icon?: string;
}

export type Platform = "mobile" | "pc" | string;

export interface Game {
  id: string;
  title: string;
  genre?: string;
  platform?: Platform;
  description: string;
  year?: string;
  image: string;
  tags: string[];
  featured?: boolean;
  featuredOrder?: number;
  inDevelopment?: boolean;
  links: ProjectLinks;
}

export interface Project {
  id: string;
  title: string;
  /** Type label shown under the title. Defaults to "Project". */
  subtext?: string;
  description: string;
  image: string;
  tags: string[];
  featured?: boolean;
  featuredOrder?: number;
  inDevelopment?: boolean;
  badge?: Badge;
  links: ProjectLinks;
}

/** A featured carousel item is a game or project flagged with its kind. */
export type FeaturedItem =
  | (Game & { isGame: true })
  | (Project & { isGame: false });

export interface Photo {
  id: string;
  title: string;
  image: string;
  alt: string;
  /** ISO date string (YYYY-MM-DD) of when the photo was taken, used for sorting and display. */
  dateTaken?: string;
}

export interface PhotosData {
  featured: Photo[];
  gallery: Photo[];
}

export interface Profile {
  name: string;
  tagline: string;
  photo: string;
  heroBio: string;
  aboutParagraphs: string[];
  email: string;
  footerYear: number;
  footerText: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

/** Keyed by category id (languages, software, other, ...). */
export type SkillsData = Record<string, SkillCategory>;

export interface Social {
  id: string;
  name: string;
  url: string;
  /** Font Awesome class, or an image path when customImage is true. */
  icon: string;
  customImage?: boolean;
}
