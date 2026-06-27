/** Smooth-scroll to an element by hash selector (e.g. "#about"). */
export function scrollToSection(hash: string): boolean {
  const target = document.querySelector(hash);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
    return true;
  }
  return false;
}
