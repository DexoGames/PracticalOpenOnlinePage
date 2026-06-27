import { useState } from "react";
import { PROFILE_DATA } from "../../data/profile";
import { SKILLS_DATA } from "../../data/skills";
import { cx } from "../../lib/cx";
import { Section } from "../Section/Section";
import styles from "./About.module.css";

export function About() {
  const [collapsed, setCollapsed] = useState(true);

  const categories = Object.entries(SKILLS_DATA).filter(
    ([, category]) => category.skills && category.skills.length > 0,
  );

  return (
    <Section id="about" title="About Me">
      <div className={styles.content}>
        <div className={styles.text}>
          <div className={cx(styles.paragraphs, collapsed && styles.collapsed)}>
            {PROFILE_DATA.aboutParagraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <button
            className={styles.toggle}
            onClick={() => setCollapsed((c) => !c)}
          >
            <span>{collapsed ? "Read More" : "Read Less"}</span>
            <i
              className={cx("fas fa-chevron-down", styles.toggleIcon)}
              style={{ transform: collapsed ? "rotate(0deg)" : "rotate(180deg)" }}
            ></i>
          </button>

          <h3>Skills &amp; Technologies</h3>
          <div className={styles.skillsAll}>
            {categories.length === 0 ? (
              <div className={styles.skillsContainer}>
                <span className={styles.skillTag}>No skills listed</span>
              </div>
            ) : (
              categories.map(([key, category]) => (
                <div
                  key={key}
                  className={styles.skillCategory}
                  data-category={key}
                >
                  <h4>{category.title}</h4>
                  <div className={styles.skillsContainer}>
                    {category.skills.map((skill) => (
                      <span key={skill} className={styles.skillTag} data-explodable>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
