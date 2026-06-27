import { useState } from "react";
import { PROFILE_DATA } from "../../data/profile";
import { SKILLS_DATA } from "../../data/skills";
import { Section } from "../Section/Section";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import styles from "./About.module.css";

export function About() {
  const [expanded, setExpanded] = useState(false);
  const paragraphs = PROFILE_DATA.aboutParagraphs;
  const visible = expanded ? paragraphs : paragraphs.slice(0, 1);

  const categories = Object.entries(SKILLS_DATA).filter(
    ([, c]) => c.skills && c.skills.length > 0,
  );

  return (
    <Section id="about" tone="cream">
      <SectionHeader
        icon="fa-user"
        label="About"
        description="Who I am and the tools I build with."
        tone="cream"
      />

      <div className={styles.body}>
        <div className={styles.text}>
          {visible.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <button
            className={styles.toggle}
            onClick={() => setExpanded((e) => !e)}
          >
            {expanded ? "Read less" : "Read more"}
            <i
              className={`fas fa-chevron-${expanded ? "up" : "down"}`}
            ></i>
          </button>
        </div>

        <div className={styles.skills}>
          <h3 className={styles.skillsTitle}>Skills &amp; Technologies</h3>
          <div className={styles.skillGroups}>
            {categories.map(([key, category]) => (
              <div
                key={key}
                className={styles.skillCategory}
                data-category={key}
              >
                {category.skills.map((skill) => (
                  <span key={skill} className={styles.skillTag} data-explodable>
                    {skill}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
