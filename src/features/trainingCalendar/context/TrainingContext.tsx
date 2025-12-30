import { createContext } from "react";
import type { TrainingBoard } from "../types/board";

export interface TrainingContextValue {
  boards: TrainingBoard[];
  setBoards: React.Dispatch<React.SetStateAction<TrainingBoard[]>>;
}

export const TrainingContext = createContext<TrainingContextValue | undefined>(
  undefined
);
