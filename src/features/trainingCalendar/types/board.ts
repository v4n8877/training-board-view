/* =========================
 * Exercise
 * ========================= */
export interface Exercise {
  id: string;
  dayId: string;
  title: string;
  description?: string;
  setsCount: number;
}

/* =========================
 * Day
 * ========================= */
export interface Day {
  id: string;
  title: string;
  date: number;
  isToday: boolean;
  workoutTitle?: string;
  exerciseIds: string[];
}

/* =========================
 * Training Board
 * ========================= */
export interface TrainingBoard {
  id: string;
  title: string;
  days: Record<string, Day>;
  dayOrder: string[];
  exercises: Record<string, Exercise>;
}
