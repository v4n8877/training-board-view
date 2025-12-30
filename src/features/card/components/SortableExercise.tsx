import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ExerciseCard from "./ExerciseCard";

export default function SortableExercise({
  exerciseId,
}: {
  exerciseId: string;
}) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: exerciseId,
      data: { type: "EXERCISE", exerciseId },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ExerciseCard exerciseId={exerciseId} />
    </div>
  );
}
