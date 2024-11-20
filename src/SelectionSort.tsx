import { useEffect, useState } from "react";
import { CodeDisplay } from "./CodeDisplay";
import { AnimationStep, VisualizerProps } from "./types";

export const SelectionSortVisualizer: React.FC<VisualizerProps> = ({
  array = [],
}) => {
  const [currentArray, setCurrentArray] = useState<number[]>([...array]);
  const [animations, setAnimations] = useState<AnimationStep[]>([]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [currentLine, setCurrentLine] = useState<number>(-1); // Houd de actieve regel bij

  useEffect(() => {
    if (array.length > 0) generateSelectionSortAnimations([...array]);
  }, [array]);

  const generateSelectionSortAnimations = (arr: number[]) => {
    const steps: AnimationStep[] = [];
    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      steps.push({ type: "code", line: 1 }); // `for i in range(len(a) - 1):`
      steps.push({ type: "code", line: 2 }); // `_min = a[i]`
      for (let j = i + 1; j < arr.length; j++) {
        steps.push({ type: "code", line: 3 }); // `for j in range(i + 1, len(a)):`
        steps.push({ type: "compare", indices: [minIndex, j] });
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
          steps.push({ type: "code", line: 4 }); // `_min = a[j]`
        }
      }
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      steps.push({ type: "swap", indices: [i, minIndex] });
      steps.push({ type: "code", line: 5 }); // `a[_pos], a[i] = a[i], _min`
    }
    setAnimations(steps);
  };

  useEffect(() => {
    if (animations.length > 0) {
      const timeout = setTimeout(() => {
        const [currentStep, ...remainingSteps] = animations;
        handleAnimationStep(currentStep);
        setAnimations(remainingSteps);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [animations]);

  const handleAnimationStep = (step: AnimationStep) => {
    switch (step.type) {
      case "compare":
        setActiveIndices(step.indices);
        break;
      case "swap":
        const [i, j] = step.indices;
        setCurrentArray((prevArray) => {
          const newArray = [...prevArray];
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
          return newArray;
        });
        setActiveIndices([]);
        break;
      case "code":
        setCurrentLine(step.line);
        break;
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "5px", marginTop: "20px" }}>
        <CodeDisplay highlightedLine={currentLine} />
        {currentArray.map((value, index) => (
          <div
            key={index}
            style={{
              height: `${value * 10}px`,
              width: "20px",
              backgroundColor: activeIndices.includes(index) ? "red" : "blue",
              transition: "height 0.5s, background-color 0.5s",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};
