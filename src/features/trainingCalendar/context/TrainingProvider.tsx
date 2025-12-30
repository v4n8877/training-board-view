import { useState, useEffect } from "react";
import { TrainingContext } from "./TrainingContext";
import type { TrainingBoard } from "../types/board";
import { loadBoardsFromJson } from "@/features/trainingCalendar/data";

const LOCAL_STORAGE_KEY = "trainingBoard";

export function TrainingProvider({ children }: { children: React.ReactNode }) {
  // Load boards from localStorage first, fallback to JSON
  const [boards, setBoards] = useState<TrainingBoard[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return [JSON.parse(saved) as TrainingBoard];
    } catch (error) {
      console.warn("Failed to load board from localStorage:", error);
    }
    return [structuredClone(loadBoardsFromJson())];
  });

  // Persist to localStorage whenever boards change
  useEffect(() => {
    if (boards.length === 0) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(boards[0]));
    } catch (error) {
      console.error("Failed to save board to localStorage:", error);
    }
  }, [boards]);

  return (
    <TrainingContext.Provider value={{ boards, setBoards }}>
      {children}
    </TrainingContext.Provider>
  );
}
