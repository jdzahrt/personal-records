export const calcOneRepMax = (weight, reps) => ((weight || 1) * (1 + (reps / 30))).toFixed(2);
