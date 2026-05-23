/**
 * Helper Utilities
 */

const MONTHS = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
const DAYS_SHORT = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

export const formatDate = (dateStr) => {
  const d = new Date(dateStr + 'T00:00:00');
  return {
    num: d.getDate(),
    mon: MONTHS[d.getMonth()],
    day: DAYS_SHORT[d.getDay()],
    full: `${DAYS_SHORT[d.getDay()]}, ${d.getDate()}. ${MONTHS[d.getMonth()]}`
  };
};

export const calculateTotalVolume = (workout) => {
  return workout.exercises.reduce((sum, ex) => {
    const sets = parseFloat(ex.sets) || 0;
    const reps = parseFloat(ex.reps) || 0;
    const kg = parseFloat(ex.kg) || 0;
    return sum + (sets * reps * kg);
  }, 0);
};

export const getBadgeClass = (type) => {
  const badgeMap = {
    'Push': 'badge-push',
    'Pull': 'badge-pull',
    'Legs': 'badge-legs',
    'Cardio': 'badge-cardio',
    'Custom': 'badge-custom'
  };
  return badgeMap[type] || 'badge-custom';
};

export const getStreak = (workouts) => {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yest = yesterday.toISOString().split('T')[0];

  const uniqueDates = [...new Set(workouts.map(w => w.date))].sort().reverse();
  if (!uniqueDates.length) return 0;
  if (uniqueDates[0] !== today && uniqueDates[0] !== yest) return 0;

  let count = 0;
  let current = uniqueDates[0];

  for (const date of uniqueDates) {
    if (date === current) {
      count++;
      const temp = new Date(current + 'T00:00:00');
      temp.setDate(temp.getDate() - 1);
      current = temp.toISOString().split('T')[0];
    } else if (date < current) {
      break;
    }
  }

  return count;
};

export const generateId = () => {
  return Math.max(0, ...JSON.parse(localStorage.getItem('ironlog_v3') || '[]').map(w => w.id || 0)) + 1;
};
