/**
 * Profile Screen
 */

import { Storage } from '../../utils/storage.js';
import { workoutManager } from '../../modules/workouts.js';
import { createStatsCalculator } from '../../modules/stats.js';
import { formatDate } from '../../utils/helpers.js';
import { themeManager } from '../../modules/theme.js';

export const ProfileScreen = {
  render: () => {
    const profile = Storage.profile.load();
    const workouts = workoutManager.getAll();
    const stats = createStatsCalculator(workouts);
    const prs = stats.getPRs();

    document.getElementById('profileName').textContent = profile.name || 'Athlet';
    document.getElementById('nameSub').textContent = `Angezeigt als: ${profile.name || 'Athlet'}`;
    const init = (profile.name || 'AT').slice(0, 2).toUpperCase();
    document.getElementById('avatarInitial').textContent = init;

    const oldest = workouts.length
      ? workouts.reduce((a, b) => a.date < b.date ? a : b, workouts[0])
      : null;
    document.getElementById('profileSub').textContent = oldest
      ? `Aktiv seit ${formatDate(oldest.date).full}`
      : 'Noch kein Training eingetragen';

    // PRs List
    const prEntries = Object.entries(prs).sort((a, b) => b[1] - a[1]);
    document.getElementById('prList').innerHTML = prEntries.length
      ? prEntries.map(([name, kg]) => `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid var(--border)">
            <span style="font-size:13px;font-weight:500">${name}</span>
            <span style="font-size:13px;font-weight:600;color:var(--accent);font-family:'DM Mono',monospace">${kg} kg</span>
          </div>
        `).join('')
      : '<div class="empty"><div class="empty-title">Noch keine PRs</div></div>';

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
      darkModeToggle.checked = themeManager.isDarkMode();
      darkModeToggle.addEventListener('change', () => {
        themeManager.toggle();
      });
    }
  },

  editName: () => {
    const profile = Storage.profile.load();
    const name = prompt('Name eingeben:', profile.name || '');
    if (name !== null) {
      profile.name = name.trim() || 'Athlet';
      Storage.profile.save(profile);
      ProfileScreen.render();
    }
  },

  exportData: () => {
    const workouts = workoutManager.getAll();
    const profile = Storage.profile.load();
    Storage.export({ workouts, profile });
  },

  clearData: () => {
    if (confirm('Alle Trainingsdaten wirklich löschen? Das kann nicht rückgängig gemacht werden.')) {
      workoutManager.clear();
      ProfileScreen.render();
    }
  }
};
