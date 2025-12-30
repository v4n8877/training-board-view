import type { DragOverEvent, DragEndEvent } from "@dnd-kit/core";
import type { TrainingBoard, Day, Exercise } from "../types/board";

/* ============================================================
 * VIEW HELPERS
 * ============================================================ */

export function getBoardViewState(
  temp: TrainingBoard | null,
  source: TrainingBoard | undefined
): TrainingBoard | null {
  return temp ?? source ?? null;
}

export function getAllExercises(board: TrainingBoard | null): Exercise[] {
  if (!board) return [];
  return Object.values(board.exercises);
}

export function getActiveExercise(
  activeId: string | null,
  exercises: Exercise[]
): Exercise | undefined {
  if (!activeId) return;
  return exercises.find((e) => e.id === activeId);
}

/* ============================================================
 * INTERNAL HELPERS
 * ============================================================ */

/**
 * Find the day that currently contains an exercise
 */
function findDayContainingExercise(
  board: TrainingBoard,
  exerciseId: string
): Day | undefined {
  return Object.values(board.days).find((day) =>
    day.exerciseIds.includes(exerciseId)
  );
}

/**
 * Resolve drop target:
 * - Hover on EXERCISE  → insert at that index
 * - Hover on DAY       → insert at end of day
 */
function getTargetLocation(
  board: TrainingBoard,
  overId?: string
): {
  targetDayId?: string;
  targetIndex?: number;
} {
  if (!overId) return {};

  /* =========================
   * 1️⃣ Hover on EXERCISE
   * ========================= */
  const overExercise = board.exercises[overId];
  if (overExercise) {
    const day = board.days[overExercise.dayId];
    return {
      targetDayId: day.id,
      targetIndex: day.exerciseIds.indexOf(overId),
    };
  }

  /* =========================
   * 2️⃣ Hover on DAY CONTAINER
   * ========================= */
  const day = board.days[overId];
  if (day) {
    return {
      targetDayId: day.id,
      targetIndex: day.exerciseIds.length,
    };
  }

  return {};
}

/* ============================================================
 * DRAG OVER — OPTIMISTIC PREVIEW
 * ============================================================ */

export function handleDragOver({
  prev,
  board,
  event,
}: {
  prev: TrainingBoard | null;
  board: TrainingBoard;
  event: DragOverEvent;
}): TrainingBoard | null {
  if (event.active.data.current?.type !== "EXERCISE") {
    return prev;
  }

  const exerciseId = String(event.active.id);
  const overId = event.over?.id as string | undefined;

  const sourceDay = findDayContainingExercise(board, exerciseId);
  if (!sourceDay) return prev;

  const { targetDayId, targetIndex } = getTargetLocation(board, overId);
  if (!targetDayId || targetIndex === undefined) return prev;

  const currentIndex = sourceDay.exerciseIds.indexOf(exerciseId);

  /**
   * ✅ IMPORTANT
   * Avoid unnecessary state updates
   * (prevents jitter + performance issues)
   */
  if (sourceDay.id === targetDayId && currentIndex === targetIndex) {
    return prev;
  }

  return moveExercise(
    board,
    sourceDay.id,
    exerciseId,
    targetDayId,
    targetIndex
  );
}

/* ============================================================
 * DRAG END — COMMIT RESULT
 * ============================================================ */

export function handleDragEnd({
  initial,
  board,
  event,
}: {
  initial: TrainingBoard | null;
  board: TrainingBoard;
  event: DragEndEvent;
}): TrainingBoard {
  if (!initial) return board;

  if (event.active.data.current?.type !== "EXERCISE") {
    return board;
  }

  const exerciseId = String(event.active.id);
  const overId = event.over?.id as string | undefined;

  const sourceDay = findDayContainingExercise(initial, exerciseId);
  if (!sourceDay) return board;

  const { targetDayId, targetIndex } = getTargetLocation(board, overId);
  if (!targetDayId || targetIndex === undefined) return board;

  return moveExercise(
    initial,
    sourceDay.id,
    exerciseId,
    targetDayId,
    targetIndex
  );
}

/* ============================================================
 * CORE MOVE LOGIC (IMMUTABLE)
 * ============================================================ */

/**
 * Move an exercise between days or reorder within the same day
 */
export function moveExercise(
  board: TrainingBoard,
  sourceDayId: string,
  exerciseId: string,
  targetDayId: string,
  targetIndex: number
): TrainingBoard {
  const sourceDay = board.days[sourceDayId];
  const targetDay = board.days[targetDayId];
  if (!sourceDay || !targetDay) return board;

  const sourceIds = [...sourceDay.exerciseIds];
  const targetIds =
    sourceDayId === targetDayId
      ? sourceIds
      : [...targetDay.exerciseIds];

  const fromIndex = sourceIds.indexOf(exerciseId);
  if (fromIndex === -1) return board;

  // Remove from source
  sourceIds.splice(fromIndex, 1);

  // Clamp insert index
  const insertAt = Math.max(
    0,
    Math.min(targetIndex, targetIds.length)
  );

  // Insert into target
  targetIds.splice(insertAt, 0, exerciseId);

  return {
    ...board,
    days: {
      ...board.days,
      [sourceDayId]: {
        ...sourceDay,
        exerciseIds: sourceIds,
      },
      [targetDayId]: {
        ...targetDay,
        exerciseIds: targetIds,
      },
    },
    exercises: {
      ...board.exercises,
      [exerciseId]: {
        ...board.exercises[exerciseId],
        dayId: targetDayId,
      },
    },
  };
}
