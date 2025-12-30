import { useState } from "react";
import { TrainingContext } from "./TrainingContext";
import type { TrainingBoard } from "../types/board";
import { loadBoardsFromJson } from "@/features/trainingCalendar/data";

export function TrainingProvider({ children }: { children: React.ReactNode }) {
  const [boards, setBoards] = useState<TrainingBoard[]>(() => [
    structuredClone(loadBoardsFromJson()),
  ]);

  return (
    <TrainingContext.Provider value={{ boards, setBoards }}>
      {children}
    </TrainingContext.Provider>
  );
}
