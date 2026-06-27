import type { Project } from "../types/content";

export const PROJECTS_DATA: Project[] = [
  {
    id: "project1",
    title: "Damaskus",
    subtext: "Game Jam Project",
    description:
      "A game made by me and a team for GGJ26. It won the Players Choice Award for Southampton.",
    image: "/images/projects/damaskus-cover.jpg",
    tags: ["Godot", "Git", "Puzzle Design", "Game Jam"],
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
];
