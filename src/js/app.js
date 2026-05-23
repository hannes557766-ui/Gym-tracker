/**
 * Main Application Entry Point
 */

import { workoutManager } from './modules/workouts.js';
import { themeManager } from './modules/theme.js';
import { HomeScreen } from './ui/screens/home.js';
import { ProfileScreen } from './ui/screens/profile.js';
import { Storage } from './utils/storage.js';

class IronLogApp {
  constructor() {
    this.currentScreen = 'home';
    this.init();
  }

  init() {
    // Initialize theme
    themeManager;

    // Render initial screen
    this.renderScreen('home');

    // Setup event listeners
    this.setupNavigationListeners();
    this.setupScreenListeners();
  }

  setupNavigationListeners() {
    document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        this.renderScreen(tab);
      });
    });
  }

  setupScreenListeners() {
    // Profile screen listeners
    document.getElementById('editNameBtn')?.addEventListener('click', () => {
      ProfileScreen.editName();
    });

    document.getElementById('exportBtnProfile')?.addEventListener('click', () => {
      ProfileScreen.exportData();
    });

    document.getElementById('exportBtnHome')?.addEventListener('click', () => {
      ProfileScreen.exportData();
    });

    document.getElementById('clearDataBtn')?.addEventListener('click', () => {
      ProfileScreen.clearData();
    });
  }

  renderScreen(screenName) {
    // Update nav buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-tab="${screenName}"]`)?.classList.add('active');

    // Update screens
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`screen-${screenName}`)?.classList.add('active');

    // Render screen content
    this.currentScreen = screenName;
    if (screenName === 'home') {
      HomeScreen.render();
    } else if (screenName === 'profile') {
      ProfileScreen.render();
    }
  }

  openDetail(id) {
    const workout = workoutManager.getById(id);
    if (workout) {
      console.log('Opening workout:', workout);
      // TODO: Implement detail view
    }
  }
}

// Initialize app
window.app = new IronLogApp();

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../src/js/service-worker.js').catch(err => {
    console.log('SW registration failed:', err);
  });
}
