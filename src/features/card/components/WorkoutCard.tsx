import SortableExercise from "@/features/card/components/SortableExercise";
import PlushIcon from "@/assets/plus-icon.webp";

export default function WorkoutCard({
  title,
  exerciseIds,
}: {
  title: string;
  exerciseIds: string[];
}) {
  return (
    <div className="bg-white rounded-[3px] border border-[#E5E7EB] p-[6px]">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-[6px]">
        <span className="text-[10px] font-bold uppercase text-[#5A57CB] truncate max-w-[120px] leading-none">
          {title}
        </span>

        <span className="text-[#C4C4C4] hover:text-[#726EE4] cursor-pointer">
          •••
        </span>
      </div>

      {/* EXERCISES */}
      <div className="flex flex-col gap-[6px]">
        {exerciseIds.map((id) => (
          <SortableExercise key={id} exerciseId={id} />
        ))}
      </div>

      {/* ADD */}
      <div className="flex justify-end mt-[6px]">
        <img
          src={PlushIcon}
          alt="add"
          className="w-[12px] h-[12px] opacity-70 hover:opacity-100 cursor-pointer"
        />
      </div>
    </div>
  );
}
