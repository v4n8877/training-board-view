import { useContext } from "react";
import { TrainingContext } from "@/features/trainingCalendar/context/TrainingContext";

export default function DaysHeader() {
  const { boards } = useContext(TrainingContext)!;
  const board = boards[0];

  return (
    <div className="flex gap-[10px]">
      {board.dayOrder.map((dayId) => {
        const day = board.days[dayId];

        return (
          <div
            key={dayId}
            className="
              w-[280px]
              flex
              justify-start
            "
          >
            <span
              className="
                font-['Open_Sans']
                text-[10px]
                font-semibold
                text-[#728096]
                uppercase
              "
            >
              {day.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
