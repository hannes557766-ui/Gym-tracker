/**
 * Theme Module - Handles Dark Mode
 */

import { Storage } from '../utils/storage.js';

class ThemeManager {
  constructor() {
    this.profile = Storage.profile.load();
    this.init();
  }

  init() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDarkMode = this.profile.darkMode !== undefined ? this.profile.darkMode : prefersDark;
    
    if (isDarkMode) {
      this.enable();
    }
  }

  toggle() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark-mode');
    
    if (isDark) {
      this.disable();
    } else {
      this.enable();
    }
  }

  enable() {
    document.documentElement.classList.add('dark-mode');
    this.profile.darkMode = true;
    Storage.profile.save(this.profile);
  }

  disable() {
    document.documentElement.classList.remove('dark-mode');
    this.profile.darkMode = false;
    Storage.profile.save(this.profile);
  }

  isDarkMode() {
    return document.documentElement.classList.contains('dark-mode');
  }
}

export const themeManager = new ThemeManager();
