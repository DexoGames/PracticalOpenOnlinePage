import type { Social } from "../types/content";

export const SOCIALS_DATA: Social[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/dextersmith126/",
    icon: "fab fa-linkedin",
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/DexoGames",
    icon: "fab fa-github",
  },
  {
    id: "itchio",
    name: "itch.io",
    url: "https://dexo-games.itch.io/",
    icon: "fab fa-itch-io",
  },
  {
    id: "linktree",
    name: "Linktree",
    url: "https://linktr.ee/dexogames",
    icon: "/images/misc/linktree.webp",
    customImage: true,
  },
];

/** Social ids surfaced as dedicated contact buttons in the Contact section. */
export const CONTACT_METHODS: string[] = ["linkedin"];
