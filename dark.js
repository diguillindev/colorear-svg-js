const DARK_MODE_TOGGLE_SELECTOR = "#toggle-darkmode";
const RESET_DARK_MODE_SELECTOR = "#reset-darkmode";
const COLOR_MODE_ATTR = "data-force-color-mode";
const COLOR_MODE_STORAGE_KEY = "color-mode";
const DARK_MODE_MEDIA_QUERY = "(prefers-color-scheme: dark)";
const DARK_MODE = "dark";
const LIGHT_MODE = "light";

const setMode = (mode) => {
  document.documentElement.setAttribute(COLOR_MODE_ATTR, mode);
  window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, mode);
  document.querySelector(DARK_MODE_TOGGLE_SELECTOR).checked = mode === DARK_MODE;
};

const resetMode = () => {
  document.documentElement.removeAttribute(COLOR_MODE_ATTR);
  window.localStorage.removeItem(COLOR_MODE_STORAGE_KEY);
  const mediaQuery = window.matchMedia(DARK_MODE_MEDIA_QUERY);
  document.querySelector(DARK_MODE_TOGGLE_SELECTOR).checked = mediaQuery.matches;
};

document.querySelector(DARK_MODE_TOGGLE_SELECTOR).addEventListener("click", (e) => {
  setMode(e.target.checked ? DARK_MODE : LIGHT_MODE);
});

document.querySelector(RESET_DARK_MODE_SELECTOR).addEventListener("click", (e) => {
  e.preventDefault();
  resetMode();
});

const mediaQuery = window.matchMedia(DARK_MODE_MEDIA_QUERY);

const handleDarkModeChange = (event) => {
  if (!document.documentElement.getAttribute(COLOR_MODE_ATTR)) {
    document.querySelector(DARK_MODE_TOGGLE_SELECTOR).checked = event.matches;
  }
};

mediaQuery.addEventListener("change", handleDarkModeChange);

const colorModeOverride = window.localStorage.getItem(COLOR_MODE_STORAGE_KEY);
const hasColorModeOverride = typeof colorModeOverride === "string";

if (hasColorModeOverride) {
  document.documentElement.setAttribute(COLOR_MODE_ATTR, colorModeOverride);
} else if (mediaQuery.matches) {
  document.querySelector(DARK_MODE_TOGGLE_SELECTOR).checked = true;
}

