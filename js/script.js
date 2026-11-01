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
