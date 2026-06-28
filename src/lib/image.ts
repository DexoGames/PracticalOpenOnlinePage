import type { SyntheticEvent } from "react";

/**
 * Derive the thumbnail path for a full-size photo path. Photos live in parallel
 * `full/` and `thumbnails/` folders with identical filenames, so the small
 * version used in grids/strips is just the full path with the folder swapped.
 */
export function thumbnailFor(image: string): string {
  return image.replace("/full/", "/thumbnails/");
}

/**
 * onError handler that swaps a broken image for a placeholder once (the old
 * inline `onerror` fallback). Guards against an infinite loop if the
 * placeholder itself fails.
 */
export function placeholderOnError(title: string, size = "400x400") {
  return (e: SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    img.onerror = null;
    img.src = `https://via.placeholder.com/${size}?text=${encodeURIComponent(title)}`;
  };
}
