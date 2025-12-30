import type { DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import type { ReactNode } from "react";

type TrainingBoardDndProvider = {
  children: ReactNode;
  onDragStart?: (id: string) => void;
  onDragOver?: (event: DragOverEvent) => void;
  onDragEnd?: (event: DragEndEvent) => void;
  overlay?: ReactNode;
};

export default function TrainingBoardDndProvider({
  children,
  onDragStart,
  onDragOver,
  onDragEnd,
  overlay,
}: TrainingBoardDndProvider) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      autoScroll={{
        enabled: true,
        threshold: { x: 0.25, y: 0.25 },
        acceleration: 12,
      }}
      onDragStart={(e) => {
        onDragStart?.(String(e.active.id));
      }}
      onDragOver={(e) => onDragOver?.(e)}
      onDragEnd={(e) => onDragEnd?.(e)}
    >
      {children}
      <DragOverlay dropAnimation={null}>{overlay}</DragOverlay>
    </DndContext>
  );
}
