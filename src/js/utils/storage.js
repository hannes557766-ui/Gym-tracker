/**
 * Storage Module - Handles all LocalStorage operations
 */

const STORAGE_KEY = 'ironlog_v3';
const PROFILE_KEY = 'ironlog_profile_v3';

export const Storage = {
  workouts: {
    load: () => {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      } catch {
        return [];
      }
    },
    save: (data) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },
    clear: () => {
      localStorage.removeItem(STORAGE_KEY);
    }
  },

  profile: {
    load: () => {
      try {
        return JSON.parse(localStorage.getItem(PROFILE_KEY)) || { name: 'Athlet', darkMode: false };
      } catch {
        return { name: 'Athlet', darkMode: false };
      }
    },
    save: (data) => {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
    }
  },

  export: (data) => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ironlog-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  import: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          resolve(data);
        } catch (err) {
          reject(new Error('Invalid JSON format'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }
};
