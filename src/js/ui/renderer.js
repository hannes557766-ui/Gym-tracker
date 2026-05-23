/**
 * Renderer Module - Handles all DOM rendering
 */

import { formatDate, calculateTotalVolume, getBadgeClass } from '../utils/helpers.js';

export const Renderer = {
  workoutRow: (workout) => {
    const fd = formatDate(workout.date);
    const names = workout.exercises
      .slice(0, 3)
      .map(e => e.name)
      .join(', ') + (workout.exercises.length > 3 ? '…' : '');
    const vol = Math.round(calculateTotalVolume(workout));

    return `
      <div class="workout-row" onclick="window.app.openDetail(${workout.id})">
        <div class="wr-date">
          <div class="wr-day">${fd.num}</div>
          <div class="wr-mon">${fd.mon}</div>
        </div>
        <div class="wr-info">
          <div class="wr-title">${workout.type} Day</div>
          <div class="wr-meta">
            <span>${workout.duration || '—'} min</span>
            <span>${names || 'Keine Übungen'}</span>
            ${vol > 0 ? `<span>${vol} kg</span>` : ''}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <div class="badge ${getBadgeClass(workout.type)}">${workout.type}</div>
        </div>
      </div>
    `;
  },

  exerciseRow: (exercise) => {
    return `
      <div class="ex-row">
        <input type="text" value="${exercise.name}" placeholder="Übung" class="ex-name-input" />
        <input type="number" value="${exercise.sets}" placeholder="Sätze" style="text-align:center" />
        <input type="number" value="${exercise.reps}" placeholder="Wdh." style="text-align:center" />
        <input type="number" value="${exercise.kg}" placeholder="Kg" step="0.5" style="text-align:center" />
        <button class="remove-ex" type="button">
          <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `;
  },

  statCard: (label, value, unit = '', sub = '') => {
    return `
      <div class="stat-card">
        <div class="stat-label">${label}</div>
        <div class="stat-value">${value}${unit ? `<sup>${unit}</sup>` : ''}</div>
        ${sub ? `<div class="stat-sub">${sub}</div>` : ''}
      </div>
    `;
  },

  heatmapCell: (date, volume, maxVolume) => {
    let level = '';
    if (volume > 10000) level = 'l4';
    else if (volume > 5000) level = 'l3';
    else if (volume > 0) level = 'l2';
    else if (date in volume) level = 'l1';

    return `<div class="hm-cell ${level}" title="${date}${volume ? ' · ' + Math.round(volume / 100) / 10 + 't' : ''}"></div>`;
  }
};
