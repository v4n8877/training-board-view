import TrainingBoardView from "@/features/trainingCalendar/components/TrainingBoardView";
import { TrainingProvider } from "@/features/trainingCalendar/context/TrainingProvider";

export default function App() {
  return (
    <TrainingProvider>
      <TrainingBoardView />
    </TrainingProvider>
  );
}
