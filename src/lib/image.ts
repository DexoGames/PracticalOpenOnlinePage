import type { SyntheticEvent } from "react";

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
