import { useContext } from "react";
import { useDroppable } from "@dnd-kit/core";
import { TrainingContext } from "@/features/trainingCalendar/context/TrainingContext";
import WorkoutCard from "@/features/card/components/WorkoutCard";
import PlushIcon from "@/assets/plus-icon.webp";

export default function TrainingDayColumn({ dayId }: { dayId: string }) {
  const { boards } = useContext(TrainingContext)!;
  const board = boards[0];
  const day = board.days[dayId];

  const { setNodeRef } = useDroppable({
    id: dayId,
    data: { type: "DAY", dayId },
  });

  return (
    <div className="flex flex-col gap-[6px]">
      <div className="flex flex-col items-start pl-[4px]">
        <span className="text-[10px] font-semibold uppercase text-[#728096]">
          {day.title}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className="
          w-[179px]
          h-[757.19px]
          bg-[#F3F5F8]
          rounded-[6px]
          p-[7px]
          flex
          flex-col
          gap-[10px]
        "
      >
        <div className="flex items-center justify-between mt-[6px]">
          <span className="text-[11px] font-semibold text-[#728096]">
            {day.date}
          </span>
          {day.exerciseIds && day.exerciseIds.length > 0 && (
            <img
              src={PlushIcon}
              alt="add"
              className="w-[12px] h-[12px] opacity-70 hover:opacity-100 cursor-pointer"
            />
          )}
        </div>
        {day.exerciseIds.length > 0 ? (
          <WorkoutCard title={day.workoutTitle} exerciseIds={day.exerciseIds} />
        ) : (
          <div className="flex-1 rounded-[6px] border border-dashed border-[#C4C4C4]" />
        )}
      </div>
    </div>
  );
}
