import { PROFILE_DATA } from "../../data/profile";
import { SocialLinks } from "../SocialLinks/SocialLinks";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section id="contact" className={styles.contact} data-explodable>
      <div className={styles.inner}>
        <span className={styles.kicker}>// Contact</span>
        <h2 className={styles.heading}>
          CONTACT MEEEEEE
        </h2>
        <p className={styles.sub}>
          You can email me if you want to get in touch :)
        </p>
        <div className={styles.actions}>
          <a className={styles.emailBtn} href={`mailto:${PROFILE_DATA.email}`}>
            <i className="fas fa-envelope"></i>
            {PROFILE_DATA.email}
          </a>
        </div>
        <SocialLinks large onOrange />
      </div>
    </section>
  );
}
