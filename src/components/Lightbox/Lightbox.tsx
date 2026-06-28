import { useEffect, type MouseEvent } from "react";
import type { Photo } from "../../types/content";
import { placeholderOnError } from "../../lib/image";
import styles from "./Lightbox.module.css";

interface LightboxProps {
  photos: Photo[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

/** Fullscreen image viewer with prev/next, Esc and arrow-key navigation. */
export function Lightbox({ photos, index, onIndexChange, onClose }: LightboxProps) {
  const photo = photos[index];

  const goPrev = () => onIndexChange((index - 1 + photos.length) % photos.length);
  const goNext = () => onIndexChange((index + 1) % photos.length);

  // Lock page scroll while open + wire keyboard navigation.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndexChange((index + 1) % photos.length);
      if (e.key === "ArrowLeft")
        onIndexChange((index - 1 + photos.length) % photos.length);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [index, photos.length, onClose, onIndexChange]);

  const handleBackdrop = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!photo) return null;

  return (
    <div className={styles.lightbox} onClick={handleBackdrop}>
      <div className={styles.content}>
        <button className={styles.close} onClick={onClose} aria-label="Close">
          ×
        </button>
        <button
          className={`${styles.nav} ${styles.prev}`}
          onClick={goPrev}
          aria-label="Previous"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <img
          src={encodeURI(photo.image)}
          alt={photo.alt}
          onError={placeholderOnError(photo.title)}
        />
        <button
          className={`${styles.nav} ${styles.next}`}
          onClick={goNext}
          aria-label="Next"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        <p className={styles.caption}>
          {photo.dateTaken
            ? new Date(photo.dateTaken + "T00:00:00").toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "Date unknown"}
        </p>
      </div>
    </div>
  );
}
