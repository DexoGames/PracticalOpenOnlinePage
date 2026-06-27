import type { Game } from "../types/content";

export const GAMES_DATA: Game[] = [
  {
    id: "game0",
    title: "Pub Team Manager",
    genre: "Football Management",
    platform: "pc",
    description:
      "Manage a club at the very bottom of the English football pyramid, with all the challenges that go along with it.",
    year: "2026",
    image: "/images/games/pubteam-cover.jpg",
    tags: ["Unity", "Match Simulation", "Complex Data Structures"],
    featured: true,
    featuredOrder: 2,
    inDevelopment: true,
    links: {},
  },
  {
    id: "game1",
    title: "Pile Up 2",
    genre: "Physics-Based Puzzle",
    platform: "mobile",
    description:
      "Use a wide variety of shapes to stack your way to the finish line.",
    year: "2023",
    image: "/images/games/pileup-cover.jpg",
    tags: ["Unity", "Online Leaderboards"],
    featured: true,
    featuredOrder: 3,
    inDevelopment: false,
    links: {
      play: "https://apps.apple.com/app/pile-up-2/id6473653290",
    },
  },
  {
    id: "game2",
    title: "Beanstalk!",
    genre: "Endless Arcade",
    platform: "mobile",
    description:
      "Climb up a 4-sided beanstalk, switching the sides and avoiding the birds.",
    image: "/images/games/beanstalk-cover.jpg",
    year: "2022",
    tags: ["Unity", "Online Multiplayer", "Pixel Art"],
    featured: false,
    inDevelopment: false,
    links: {
      play: "https://apps.apple.com/app/beanstalk/id1603662985",
    },
  },
  {
    id: "game3",
    title: "Gridlock+",
    genre: "Strategy",
    platform: "mobile",
    description:
      "Play Gridlock (dots and boxes on steroids) and compete online or against AI. Or play a selection of other unique and challenging games.",
    year: "2024",
    image: "/images/games/gridlock-cover.jpg",
    tags: ["Unity", "Online Multiplayer", "Online Matchmaking", "AI Opponents"],
    featured: false,
    inDevelopment: false,
    links: {
      play: "https://apps.apple.com/app/gridlock/id6651863189",
    },
  },
  {
    id: "game4",
    title: "Foriom",
    genre: "Puzzle",
    platform: "pc",
    description: "Make a graph formula to dodge obstacles and get to the end.",
    year: "2025",
    image: "/images/games/foriom-cover.jpg",
    tags: ["Unity", "Game Jam"],
    featured: false,
    inDevelopment: false,
    links: {
      play: "https://dexo-games.itch.io/foriom",
    },
  },
];
