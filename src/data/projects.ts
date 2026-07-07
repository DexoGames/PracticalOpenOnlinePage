import type { Project } from "../types/content";

export const PROJECTS_DATA: Project[] = [
  {
    id: "project1",
    title: "Damaskus",
    subtext: "Game Jam Project",
    description:
      "A game made by me and a team for GGJ26. It won the Players Choice Award for Southampton.",
    image: "/images/projects/damaskus-cover.jpg",
    tags: ["Godot", "Puzzle Design", "Game Jam", "Git"],
    featured: true,
    featuredOrder: 1,
    inDevelopment: false,
    badge: {
      text: "Game Jam Winner",
      icon: "fa-trophy",
    },
    links: {
      play: "https://damaskus.indigo.spot",
      github: "https://github.com/Lem0naise/damaskus",
    },
  },
  {
      id: "project2",
    title: "Apexle",
    subtext: "Daily F1 Game",
    description:
      "Using real telemetry data, you guess the corner of an F1 track, in a wordle-style daily game.",
    image: "/images/projects/apexle-cover.jpg",
    imageFocus: "top",
    tags: ["Website", "UI/UX Design", "Real-World Data"],
    featured: true,
    featuredOrder: 2,
    inDevelopment: true,
    links: {
      play: "https://apexle.dexo.games",
      github: "https://github.com/DexoGames/Apexle",
    },
  },
    {
      id: "project3",
    title: "Slate",
    subtext: "Film Studio Sim",
    description:
      "Take the helm of a new studio, hire directors and actors, address compromises, promote, and try to make a hit!",
    image: "/images/projects/slate-cover.jpg",
    imageFocus: "top",
    tags: ["Website", "UI/UX Design"],
    featured: true,
    featuredOrder: 3,
    inDevelopment: true,
    links: {
      play: "https://slate.dexo.games",
      github: "https://github.com/DexoGames/Slate",
    },
  },
  {
      id: "project4",
    title: "Versus",
    subtext: "Web Port of Gridlock+",
    description:
      "Play the 3 main games from Gridlock+ with improved UI.",
    image: "/images/projects/versus-cover.jpg",
    tags: ["Website", "UI/UX Design"],
    featured: true,
    featuredOrder: 3,
    inDevelopment: true,
    links: {
      play: "https://vs.dexo.games",
      github: "https://github.com/DexoGames/Versus",
    },
  },
];
