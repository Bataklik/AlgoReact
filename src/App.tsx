import { SelectionSortVisualizer } from "./SelectionSort";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <SelectionSortVisualizer array={[4, 2, 3, 5, 1]} />
    </div>
  );
}
