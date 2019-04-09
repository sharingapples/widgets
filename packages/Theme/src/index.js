/* global __DEV__ */
import material from './stock/material';

let currentTheme = material;

export {
  material,
};

export function isDark(color) {
  if (color.startsWith('#')) {
    const len = color.length < 7 ? 1 : 2;
    const red = parseInt(color.substr(1, len), 16) / 255;
    const green = parseInt(color.substr(1 + len, len), 16) / 255;
    const blue = parseInt(color.substr(1 + len * 2, len), 16) / 255;
    const darkness = 1 - (0.299 * red + 0.587 * green + 0.114 * blue);
    return darkness > 0.5;
  }

  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.warn(`@sharingapples/theme only supports determining darkness from rgb color value, got ${color}`);
  }

  // Assume non dark by default
  return false;
}

export function selectTheme(theme) {
  currentTheme = theme;
}

export function getTheme() {
  return currentTheme;
}
