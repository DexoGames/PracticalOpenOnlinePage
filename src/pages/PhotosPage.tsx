import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PHOTOS_DATA } from "../data/photos";
import { placeholderOnError, thumbnailFor } from "../lib/image";
import { Navbar } from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/Footer";
import { Lightbox } from "../components/Lightbox/Lightbox";
import styles from "./PhotosPage.module.css";

export function PhotosPage() {
  const photos = [...PHOTOS_DATA.gallery].sort((a, b) => {
    if (a.dateTaken && b.dateTaken) return b.dateTaken.localeCompare(a.dateTaken);
    if (a.dateTaken) return -1;
    if (b.dateTaken) return 1;
    return b.title.localeCompare(a.title);
  });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Start at the top when navigating in from the home page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar variant="photos" />
      <main className={styles.page} data-explodable>
        <Link to="/" className={styles.backLink}>
          <i className="fas fa-arrow-left"></i>
          Back to Home
        </Link>

        <div className={styles.header}>
          <h1>Dexo Photos</h1>
          <p>A collection of my photography work</p>
          <p>instagram @dexo.photos</p>
        </div>

        {photos.length > 0 && (
          <div className={styles.gallerySection}>
            <div className={styles.galleryGrid}>
              {photos.map((photo, i) => (
                <div
                  key={photo.id}
                  className={styles.galleryItem}
                  data-explodable
                  onClick={() => setOpenIndex(i)}
                >
                  <img
                    src={encodeURI(thumbnailFor(photo.image))}
                    alt={photo.alt}
                    loading="lazy"
                    onError={placeholderOnError(photo.title, "400x300")}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />

      {openIndex !== null && (
        <Lightbox
          photos={photos}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
