import { useContext } from "react";
import { TrainingContext } from "@/features/trainingCalendar/context/TrainingContext";

export default function ExerciseCard({ exerciseId }: { exerciseId: string }) {
  const { boards } = useContext(TrainingContext)!;
  const board = boards[0];
  const exercise = board.exercises[exerciseId];

  if (!exercise) return null;

  return (
    <div
      className="
        w-full
        bg-white
        rounded-[3px]
        border
        border-[#E5E7EB]
        px-[6px]
        py-[4px]
        flex
        overflow-hidden
      "
    >
      {/* CỘT SETSCOUNT, bottom-aligned */}
      <div className="flex-shrink-0 w-[20px] flex items-end text-[10px] font-bold text-[#919CAD]">
        {exercise.setsCount}x
      </div>

      {/* CỘT TITLE + DESCRIPTION */}
      <div className="flex-1 flex flex-col ml-[4px] overflow-hidden">
        <span className="text-[13px] font-semibold text-black truncate leading-none text-right">
          {exercise.title}
        </span>
        <span className="text-[10px] font-normal text-[#95A6B7] truncate text-right">
          {exercise.description}
        </span>
      </div>
    </div>
  );
}
