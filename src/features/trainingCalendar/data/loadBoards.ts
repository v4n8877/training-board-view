import rawData from "@/features/trainingCalendar/data/boards.json";
import type { TrainingBoard } from "../types/board";

export function loadBoardsFromJson(): TrainingBoard {
  return structuredClone(rawData) as TrainingBoard;
}
