import { Link } from "react-router-dom";
import { PHOTOS_DATA } from "../../data/photos";
import { placeholderOnError } from "../../lib/image";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import styles from "./PhotosStrip.module.css";

export function PhotosStrip() {
  const featured = PHOTOS_DATA.featured;
  if (!featured || featured.length === 0) return null;

  // Duplicate so the marquee can loop seamlessly (translateX -50%).
  const photos = [...featured, ...featured];

  return (
    <section id="photos" className={styles.photos} data-explodable>
      <div className={styles.headerBand}>
        <div className={styles.headerInner}>
          <SectionHeader
            icon="fa-camera"
            label="Dexo Photos"
            description="Photography from wherever I happen to be."
            tone="black"
          />
        </div>
      </div>

      <div className={styles.scrollWrapper}>
        <div className={styles.scrollTrack}>
          {photos.map((photo, i) => (
            <div className={styles.photoItem} key={`${photo.id}-${i}`}>
              <img
                src={encodeURI(photo.image)}
                alt={photo.alt}
                onError={placeholderOnError(photo.title, "300x200")}
              />
              <div className={styles.overlay}>
                <span>{photo.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.btnWrapper}>
        <Link to="/photos" className={styles.viewMoreBtn}>
          <span>View all photos</span>
          <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </section>
  );
}
