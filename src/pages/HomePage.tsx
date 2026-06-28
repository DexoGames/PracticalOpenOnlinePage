import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GAMES_DATA } from "../data/games";
import { PROJECTS_DATA } from "../data/projects";
import { gameToCard, projectToCard } from "../lib/cards";
import { scrollToSection } from "../lib/scroll";
import { Navbar } from "../components/Navbar/Navbar";
import { Hero } from "../components/Hero/Hero";
import { FeaturedSlider } from "../components/FeaturedSlider/FeaturedSlider";
import { About } from "../components/About/About";
import { ProjectsList } from "../components/ProjectsList/ProjectsList";
import { PhotosStrip } from "../components/PhotosStrip/PhotosStrip";
import { Contact } from "../components/Contact/Contact";
import { Footer } from "../components/Footer/Footer";

export function HomePage() {
  const location = useLocation();

  // Scroll to a hash target (e.g. /#about) once sections have rendered.
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
      <FeaturedSlider />
      <About />
      <ProjectsList
        id="games"
        icon="fa-gamepad"
        label="My Games"
        description="Games I've designed, built, and shipped solo, under Dexo Games."
        cards={gameCards}
        emptyMessage="No games yet - check back soon!"
      />
      <ProjectsList
        id="projects"
        icon="fa-folder-open"
        label="Other Projects"
        description="Everything else: solo projects and team-made games."
        cards={projectCards}
        emptyMessage="No projects yet - check back soon!"
      />
      <PhotosStrip />
      <Contact />
      <Footer />
    </>
  );
}
