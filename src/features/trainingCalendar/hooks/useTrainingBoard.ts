import { useContext, useCallback } from "react";
import type { TrainingBoard } from "../types/board";
import { TrainingContext } from "../context/TrainingContext";

export function useTrainingBoard(boardId: string) {
  const ctx = useContext(TrainingContext);

  if (!ctx) {
    throw new Error("useTrainingBoard must be used within TrainingProvider");
  }

  const { boards, setBoards } = ctx;

  const board = boards.find(b => b.id === boardId);

  if (!board) {
    throw new Error(`TrainingBoard "${boardId}" not found`);
  }

  // ✅ Update đúng 1 board, immutable
  const setBoard = useCallback(
    (updater: TrainingBoard | ((prev: TrainingBoard) => TrainingBoard)) => {
      setBoards(prev =>
        prev.map(b =>
          b.id !== boardId
            ? b
            : typeof updater === "function"
              ? updater(b)
              : updater
        )
      );
    },
    [boardId, setBoards]
  );

  return {
    data: board,
    setBoard,
  };
}
