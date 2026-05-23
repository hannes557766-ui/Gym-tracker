/**
 * Stats Module - Calculates statistics and metrics
 */

import { calculateTotalVolume } from '../utils/helpers.js';

class StatsCalculator {
  constructor(workouts) {
    this.workouts = workouts;
  }

  updateWorkouts(workouts) {
    this.workouts = workouts;
  }

  getPRs() {
    const prs = {};
    this.workouts.forEach(w => {
      w.exercises.forEach(ex => {
        const key = ex.name.trim();
        if (!key) return;
        const kg = parseFloat(ex.kg) || 0;
        if (!prs[key] || kg > prs[key]) {
          prs[key] = kg;
        }
      });
    });
    return prs;
  }

  getExerciseHistory(exerciseName) {
    const history = {};
    this.workouts.forEach(w => {
      w.exercises.forEach(ex => {
        if (ex.name.trim() === exerciseName) {
          if (!history[ex.name]) history[ex.name] = [];
          history[ex.name].push({
            date: w.date,
            kg: parseFloat(ex.kg) || 0,
            sets: parseFloat(ex.sets) || 0,
            reps: parseFloat(ex.reps) || 0
          });
        }
      });
    });
    return history;
  }

  getVolumeByType() {
    const types = {};
    this.workouts.forEach(w => {
      types[w.type] = (types[w.type] || 0) + calculateTotalVolume(w);
    });
    return types;
  }

  getTopExercises(limit = 8) {
    const exercises = {};
    this.workouts.forEach(w => {
      w.exercises.forEach(ex => {
        const key = ex.name.trim();
        if (!key) return;
        const vol = (parseFloat(ex.sets) || 0) * (parseFloat(ex.reps) || 0) * (parseFloat(ex.kg) || 0);
        exercises[key] = (exercises[key] || 0) + vol;
      });
    });
    return Object.entries(exercises)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);
  }

  getWeeklyStats(daysBack = 7) {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - daysBack + 1);

    const stats = {};
    for (let i = 0; i < daysBack; i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().split('T')[0];
      stats[key] = { workouts: 0, volume: 0 };
    }

    this.workouts.forEach(w => {
      if (w.date in stats) {
        stats[w.date].workouts += 1;
        stats[w.date].volume += calculateTotalVolume(w);
      }
    });

    return stats;
  }

  getHeatmapData(days = 90) {
    const today = new Date();
    const data = {};

    for (let i = days; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      data[key] = 0;
    }

    this.workouts.forEach(w => {
      if (w.date in data) {
        data[w.date] += calculateTotalVolume(w) || 1;
      }
    });

    return data;
  }
}

export const createStatsCalculator = (workouts) => new StatsCalculator(workouts);
