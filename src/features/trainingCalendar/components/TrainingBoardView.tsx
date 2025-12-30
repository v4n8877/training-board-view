import { useMemo, useRef, useState } from "react";
import type { DragEndEvent, DragOverEvent } from "@dnd-kit/core";

import {
  getBoardViewState,
  handleDragOver,
  handleDragEnd,
} from "../services/mutations";

import { DEFAULT_BOARD_ID } from "../constants/board.constants";
import type { TrainingBoard } from "../types/board";

import TrainingBoardDndProvider from "../dnd/TrainingBoardDndProvider";
import ExerciseCard from "@/features/card/components/ExerciseCard";
import { useTrainingBoard } from "../hooks/useTrainingBoard";
import TrainingDayColumn from "@/features/column/components/TrainingDayColumn";

export default function TrainingBoardView() {
  const { data: board, setBoard } = useTrainingBoard(DEFAULT_BOARD_ID);

  const [tempState, setTempState] = useState<TrainingBoard | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const initialBoardRef = useRef<TrainingBoard | null>(null);

  // Derived viewBoard, prefers tempState for drag preview
  const viewBoard = useMemo(
    () => getBoardViewState(tempState, board),
    [tempState, board]
  );

  if (!viewBoard) return null;

  /* ============================================================
   * DRAG HANDLERS
   * ============================================================ */
  function onDragStart(id: string) {
    setActiveId(id);
    initialBoardRef.current = structuredClone(viewBoard);
  }

  function onDragOver(event: DragOverEvent) {
    setTempState((prev) => handleDragOver({ prev, board: viewBoard, event }));
  }

  function onDragEnd(event: DragEndEvent) {
    if (!initialBoardRef.current) return;

    setBoard((prev) =>
      handleDragEnd({
        initial: initialBoardRef.current,
        board: prev,
        event,
      })
    );

    // Reset temporary states
    setActiveId(null);
    setTempState(null);
    initialBoardRef.current = null;
  }

  return (
    <TrainingBoardDndProvider
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      overlay={
        activeId ? (
          <div className="opacity-90">
            <ExerciseCard exerciseId={activeId} />
          </div>
        ) : null
      }
    >
      {/* BOARD CONTAINER */}
      <div className="flex justify-center bg-white w-full min-h-screen py-10">
        <div className="w-full max-w-[1440px] px-[60px]">
          <div className="overflow-x-auto overflow-y-hidden hide-scrollbar-x">
            <div className="flex gap-[10px] min-w-max justify-center">
              {viewBoard.dayOrder.map((dayId) => (
                <TrainingDayColumn key={dayId} dayId={dayId} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </TrainingBoardDndProvider>
  );
}
