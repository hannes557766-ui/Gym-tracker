/**
 * Workouts Module - Manages all workout operations
 */

import { Storage } from '../utils/storage.js';
import { calculateTotalVolume, generateId } from '../utils/helpers.js';

class WorkoutManager {
  constructor() {
    this.workouts = Storage.workouts.load();
    this.editingId = null;
  }

  getAll() {
    return this.workouts;
  }

  getById(id) {
    return this.workouts.find(w => w.id === id);
  }

  add(workout) {
    const newWorkout = {
      id: generateId(),
      ...workout,
      createdAt: new Date().toISOString()
    };
    this.workouts.push(newWorkout);
    this.save();
    return newWorkout;
  }

  update(id, updates) {
    const workout = this.getById(id);
    if (workout) {
      Object.assign(workout, updates, { updatedAt: new Date().toISOString() });
      this.save();
    }
    return workout;
  }

  delete(id) {
    const index = this.workouts.findIndex(w => w.id === id);
    if (index !== -1) {
      this.workouts.splice(index, 1);
      this.save();
      return true;
    }
    return false;
  }

  getRecent(limit = 5) {
    return [...this.workouts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
  }

  getByDateRange(startDate, endDate) {
    return this.workouts.filter(w => w.date >= startDate && w.date <= endDate);
  }

  getByType(type) {
    return this.workouts.filter(w => w.type === type);
  }

  save() {
    Storage.workouts.save(this.workouts);
  }

  clear() {
    this.workouts = [];
    Storage.workouts.clear();
  }
}

export const workoutManager = new WorkoutManager();
