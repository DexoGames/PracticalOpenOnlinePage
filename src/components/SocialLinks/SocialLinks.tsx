import { cx } from "../../lib/cx";
import { SOCIALS_DATA } from "../../data/socials";
import styles from "./SocialLinks.module.css";

interface SocialLinksProps {
  /** Larger icons (used in the Contact section). */
  large?: boolean;
  /** Adjust hover colours for use on an orange background. */
  onOrange?: boolean;
}

/** Row of square social icon links (hero + contact). */
export function SocialLinks({ large, onOrange }: SocialLinksProps) {
  const activeSocials = SOCIALS_DATA.filter((s) => s.url);

  return (
    <div
      className={cx(
        styles.socialLinks,
        large && styles.large,
        onOrange && styles.onOrange,
      )}
    >
      {activeSocials.map((social) => (
        <a
          key={social.id}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          title={social.name}
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
        </a>
      ))}
    </div>
  );
}
