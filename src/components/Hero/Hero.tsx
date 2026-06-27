import { PROFILE_DATA } from "../../data/profile";
import { SocialLinks } from "../SocialLinks/SocialLinks";
import { placeholderOnError } from "../../lib/image";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <header className={styles.hero} id="hero" data-explodable>
      <div className={styles.content}>
        <div className={styles.profileImage}>
          <img
            src={PROFILE_DATA.photo}
            alt={PROFILE_DATA.name}
            onError={placeholderOnError(PROFILE_DATA.name)}
          />
        </div>
        <h1>{PROFILE_DATA.name}</h1>
        <p className={styles.tagline}>{PROFILE_DATA.tagline}</p>
        <p className={styles.description}>{PROFILE_DATA.heroBio}</p>
        <SocialLinks />
      </div>
    </header>
  );
}
