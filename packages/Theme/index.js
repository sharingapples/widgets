import material from './stock/material';

let currentTheme = material;

export function setTheme(theme) {
  currentTheme = theme;
}

export function getTheme() {
  return currentTheme;
}
