import { useMemo, useState } from "react";
import Simulation from "./Simulation.jsx";

function Practice({ tasks, steps }) {
  const [taskIndex, setTaskIndex] = useState(0);
  const stepMap = useMemo(() => {
    const map = new Map();
    steps.forEach((step) => map.set(step.id, step));
    return map;
  }, [steps]);

  if (!tasks || tasks.length === 0) {
    return <div className="card">Практические задания пока не добавлены.</div>;
  }

  if (taskIndex >= tasks.length) {
    return (
      <div className="card">
        <h3>Практика завершена</h3>
        <p style={{ color: "#2f7c4f" }}>Вы выполнили все задания без ошибок.</p>
      </div>
    );
  }

  const currentTask = tasks[taskIndex];
  const currentStep = stepMap.get(currentTask.stepId);

  const handleComplete = () => {
    if (taskIndex < tasks.length - 1) {
      setTaskIndex(taskIndex + 1);
    } else {
      setTaskIndex(tasks.length);
    }
  };

  return (
    <div className="card">
      <div className="section-title">
        <h3>{currentTask.title}</h3>
        <span className="badge">Задание {taskIndex + 1} из {tasks.length}</span>
      </div>
      <Simulation step={currentStep} onComplete={handleComplete} strict showHintCursor={false} />
    </div>
  );
}

export default Practice;
