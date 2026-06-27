import { PROFILE_DATA } from "../../data/profile";
import { CONTACT_METHODS, SOCIALS_DATA } from "../../data/socials";
import { Section } from "../Section/Section";
import { SocialLinks } from "../SocialLinks/SocialLinks";
import styles from "./Contact.module.css";

export function Contact() {
  // Contact methods = email (if set) + the configured CONTACT_METHODS socials.
  const methodSocials = CONTACT_METHODS.map((id) =>
    SOCIALS_DATA.find((s) => s.id === id),
  ).filter((s): s is NonNullable<typeof s> => !!s && !!s.url);

  return (
    <Section id="contact" title="Get In Touch">
      <div className={styles.content}>
        <p>
          Interested in working together or just want to say hi? Feel free to
          reach out!
        </p>
        <div className={styles.methods}>
          {PROFILE_DATA.email && (
            <a href={`mailto:${PROFILE_DATA.email}`} className={styles.item}>
              <i className="fas fa-envelope"></i>
              <span>{PROFILE_DATA.email}</span>
            </a>
          )}
          {methodSocials.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.item}
            >
              {social.customImage ? (
                <img
                  src={social.icon}
                  alt={social.name}
                  className={styles.customIcon}
                />
              ) : (
                <i className={social.icon}></i>
              )}
              <span>{social.name}</span>
            </a>
          ))}
        </div>
        <SocialLinks large />
      </div>
    </Section>
  );
}
