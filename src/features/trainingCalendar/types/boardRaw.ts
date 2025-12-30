export interface RawDay {
  id: string;
  title: string;
  exerciseIds: string[];
}

export interface RawExercise {
  id: string;
  dayId: string;
  title: string;
  description?: string;
}

export interface RawTrainingBoard {
  id: string;
  title: string;
  dayOrder: string[];
  days: Record<string, RawDay>;
  exercises?: Record<string, RawExercise>;
}
