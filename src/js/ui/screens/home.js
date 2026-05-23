/**
 * Home Screen
 */

import { workoutManager } from '../../modules/workouts.js';
import { createStatsCalculator } from '../../modules/stats.js';
import { formatDate, calculateTotalVolume, getStreak } from '../../utils/helpers.js';
import { Renderer } from '../renderer.js';

const DAYS_SHORT = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

export const HomeScreen = {
  render: () => {
    const workouts = workoutManager.getAll();
    const stats = createStatsCalculator(workouts);
    const streak = getStreak(workouts);
    const now = new Date();
    const weekWorkouts = workouts.filter(w => (now - new Date(w.date + 'T00:00:00')) / 86400000 <= 7);
    const totalVolume = workouts.reduce((s, w) => s + calculateTotalVolume(w), 0);
    const avgDuration = workouts.length ? Math.round(workouts.reduce((s, w) => s + (w.duration || 0), 0) / workouts.length) : 0;
    const prs = stats.getPRs();
    const prCount = Object.keys(prs).length;

    // Stats Grid
    document.getElementById('statsGrid').innerHTML = `
      ${Renderer.statCard('Woche', weekWorkouts.length, '', 'Einheiten')}
      ${Renderer.statCard('Gesamt', workouts.length, '', 'Trainings')}
      ${Renderer.statCard('Volumen', (totalVolume / 1000).toFixed(1), 't', 'Gesamt')}
      ${Renderer.statCard('Ø Dauer', avgDuration, 'min', 'Pro Einheit')}
      ${Renderer.statCard('PRs', prCount, '', 'Rekorde')}
      ${Renderer.statCard('Streak', streak, '🔥', 'Tage')}
    `;

    // Streak Banner
    document.getElementById('streakNum').textContent = streak;

    // Week Bars
    HomeScreen.renderWeekBars(workouts);

    // Recent Log
    const recent = workoutManager.getRecent(5);
    document.getElementById('recentLog').innerHTML = recent.length
      ? recent.map(Renderer.workoutRow).join('')
      : '<div class="empty"><div class="empty-icon">🏋️</div><div class="empty-title">Noch kein Training</div></div>';

    // Heatmap
    HomeScreen.renderHeatmap(stats.getHeatmapData());
  },

  renderWeekBars: (workouts) => {
    const wb = document.getElementById('weekBars');
    const wl = document.getElementById('weekLabels');
    wb.innerHTML = '';
    wl.innerHTML = '';

    const today = new Date();
    const maxWkVol = Math.max(1, ...[0, 1, 2, 3, 4, 5, 6].map(i => {
      const d = new Date(today);
      d.setDate(d.getDate() - 6 + i);
      const key = d.toISOString().split('T')[0];
      return workouts.filter(w => w.date === key).reduce((s, w) => s + calculateTotalVolume(w), 0);
    }));

    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - 6 + i);
      const key = d.toISOString().split('T')[0];
      const isToday = key === today.toISOString().split('T')[0];
      const dayVol = workouts.filter(w => w.date === key).reduce((s, w) => s + calculateTotalVolume(w), 0);
      const h = dayVol > 0 ? Math.max(12, Math.round(dayVol / maxWkVol * 56)) : 4;

      const bar = document.createElement('div');
      bar.className = 'week-bar' + (dayVol > 0 ? ' has-workout' : '') + (isToday ? ' today' : '');
      bar.style.height = h + 'px';
      wb.appendChild(bar);

      const lbl = document.createElement('div');
      lbl.className = 'week-bar-label' + (isToday ? ' today' : '');
      lbl.textContent = DAYS_SHORT[d.getDay()];
      wl.appendChild(lbl);
    }
  },

  renderHeatmap: (data) => {
    const cells = [];
    const today = new Date();
    const maxVol = Math.max(1, ...Object.values(data));

    for (let i = 90; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const v = data[key] || 0;

      let level = '';
      if (v > 10000) level = 'l4';
      else if (v > 5000) level = 'l3';
      else if (v > 0) level = 'l2';
      else if (key in data) level = 'l1';

      cells.push(`<div class="hm-cell ${level}" title="${key}${v ? ' · ' + Math.round(v / 100) / 10 + 't' : ''}"></div>`);
    }

    document.getElementById('heatmap').innerHTML = cells.join('');
  }
};
