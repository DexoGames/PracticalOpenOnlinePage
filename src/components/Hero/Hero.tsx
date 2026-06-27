import { PROFILE_DATA } from "../../data/profile";
import { SocialLinks } from "../SocialLinks/SocialLinks";
import { Button } from "../Button/Button";
import { placeholderOnError } from "../../lib/image";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <header className={styles.hero} id="hero" data-explodable>
      <div className={styles.inner}>
        <div className={styles.main}>
          <div className={styles.avatar}>
            <img
              src={PROFILE_DATA.photo}
              alt={PROFILE_DATA.name}
              onError={placeholderOnError(PROFILE_DATA.name)}
            />
          </div>
          <div className={styles.nameBlock}>
            <span className={styles.im}>I&apos;M</span>
            <h1 className={styles.name}>{PROFILE_DATA.name}</h1>
          </div>
        </div>

        <div className={styles.aside}>
          <span className={styles.tag}>// 01 — Introduction</span>
          <p className={styles.tagline}>{PROFILE_DATA.tagline}</p>
          <p className={styles.bio}>{PROFILE_DATA.heroBio}</p>
          <div className={styles.actions}>
            <Button href="#contact" external={false}>
              Get in touch
            </Button>
            <Button href="#games" variant="secondary" external={false}>
              View work
            </Button>
          </div>
          <SocialLinks />
        </div>
      </div>
    </header>
  );
}
