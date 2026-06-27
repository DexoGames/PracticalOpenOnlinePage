import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GAMES_DATA } from "../data/games";
import { PROJECTS_DATA } from "../data/projects";
import { gameToCard, projectToCard } from "../lib/cards";
import { scrollToSection } from "../lib/scroll";
import { Navbar } from "../components/Navbar/Navbar";
import { Hero } from "../components/Hero/Hero";
import { FeaturedCarousel } from "../components/FeaturedCarousel/FeaturedCarousel";
import { About } from "../components/About/About";
import { ProjectsGrid } from "../components/ProjectsGrid/ProjectsGrid";
import { PhotosStrip } from "../components/PhotosStrip/PhotosStrip";
import { Contact } from "../components/Contact/Contact";
import { Footer } from "../components/Footer/Footer";

export function HomePage() {
  const location = useLocation();

  // When arriving from another route with a hash (e.g. /#about), scroll to it
  // once the sections have rendered.
  useEffect(() => {
    if (location.hash) {
      const id = setTimeout(() => scrollToSection(location.hash), 0);
      return () => clearTimeout(id);
    }
  }, [location.hash]);

  const gameCards = GAMES_DATA.map(gameToCard);
  const projectCards = PROJECTS_DATA.map(projectToCard);

  return (
    <>
      <Navbar variant="home" />
      <Hero />
      <FeaturedCarousel />
      <About />
      <ProjectsGrid
        id="games"
        title="My Games"
        cards={gameCards}
        emptyMessage="No games yet - check back soon!"
      />
      <ProjectsGrid
        id="projects"
        title="Other Projects"
        cards={projectCards}
        emptyMessage="No projects yet - check back soon!"
      />
      <PhotosStrip />
      <Contact />
      <Footer />
    </>
  );
}
