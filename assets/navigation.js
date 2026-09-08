const navigationLinks = [...document.querySelectorAll(".nav-links a")];
const sections = navigationLinks.map((link) =>
  document.querySelector(link.getAttribute("href"))
);

function updateNavigation() {
  const header = document.querySelector(".site-header");
  const threshold = header.getBoundingClientRect().bottom + 80;
  let activeIndex = 0;

  sections.forEach((section, index) => {
    if (section.getBoundingClientRect().top <= threshold) activeIndex = index;
  });

  navigationLinks.forEach((link, index) => {
    if (index === activeIndex) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

// Coalesce scroll events into one layout check per animation frame.
let scheduled = false;
window.addEventListener("scroll", () => {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    updateNavigation();
    scheduled = false;
  });
}, { passive: true });

window.addEventListener("resize", updateNavigation);
window.addEventListener("pageshow", updateNavigation);
updateNavigation();
