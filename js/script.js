(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;

  const storageKey = "nahilla-portfolio-theme";

  function readSavedTheme() {
    try {
      return window.localStorage.getItem(storageKey) === "light" ? "light" : "dark";
    } catch {
      return "dark";
    }
  }

  function applyTheme(theme, save = true) {
    root.dataset.theme = theme;
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );

    if (save) {
      try {
        window.localStorage.setItem(storageKey, theme);
      } catch {
        // The control still works when browser storage is unavailable.
      }
    }
  }

  applyTheme(readSavedTheme(), false);
  themeToggle.addEventListener("click", () => {
    applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });
})();

(() => {
  const starfield = document.querySelector(".starfield");
  if (!starfield || typeof window.matchMedia !== "function") return;

  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const layers = Array.from(document.querySelectorAll(
    ".starfield [data-parallax-speed], .hero-galaxy [data-parallax-speed]"
  ));
  let framePending = false;

  function updateLayers() {
    framePending = false;
    if (motionPreference.matches) return;

    const scrollY = Math.max(0, window.scrollY || window.pageYOffset || 0);
    layers.forEach((layer) => {
      const speed = Number.parseFloat(layer.dataset.parallaxSpeed) || 0;
      const tileHeight = Number.parseFloat(layer.dataset.tileHeight) || 1;
      const offset = -((scrollY * speed) % tileHeight);
      layer.style.backgroundPositionY = `${offset.toFixed(2)}px`;
    });
  }

  function scheduleLayerUpdate() {
    if (motionPreference.matches || framePending) return;
    framePending = true;
    window.requestAnimationFrame(updateLayers);
  }

  window.addEventListener("scroll", scheduleLayerUpdate, { passive: true });
  window.addEventListener("resize", scheduleLayerUpdate, { passive: true });
  motionPreference.addEventListener("change", (event) => {
    if (event.matches) {
      layers.forEach((layer) => layer.style.removeProperty("background-position-y"));
    } else {
      scheduleLayerUpdate();
    }
  });

  scheduleLayerUpdate();
})();
