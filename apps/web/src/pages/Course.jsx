import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Simulation from "../components/Simulation.jsx";
import Practice from "../components/Practice.jsx";
import Quiz from "../components/Quiz.jsx";
import Chatbot from "../components/Chatbot.jsx";
import { speak } from "../utils/voice.js";

function Course({ courses, level, progress, onCompleteStep, voiceEnabled, onSetHelpContext, onRequestHint, onSubmitQuiz }) {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const course = courses.find((item) => item.id === courseId);

  const steps = useMemo(() => {
    if (!course) return [];
    return course.steps.filter((step) => level === "ADVANCED" || step.level === "BASIC");
  }, [course, level]);

  const completedSet = useMemo(() => {
    return new Set(
      progress
        .filter((item) => item.courseId === course?.id && item.status === "COMPLETED")
        .map((item) => item.stepId)
    );
  }, [progress, course]);

  const firstIncompleteIndex = steps.findIndex((step) => !completedSet.has(step.id));
  const defaultIndex = firstIncompleteIndex === -1 ? Math.max(steps.length - 1, 0) : firstIncompleteIndex;

  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [tab, setTab] = useState("simulation");

  useEffect(() => {
    setActiveIndex(defaultIndex);
  }, [course?.id, level, progress.length]);

  const activeStep = steps[activeIndex];

  useEffect(() => {
    if (activeStep) {
      onSetHelpContext(activeStep);
      if (voiceEnabled) speak(activeStep.instruction);
    }
  }, [activeStep, onSetHelpContext, voiceEnabled]);

  if (!course) {
    return (
      <div className="container">
        <p>Тема не найдена. Вернитесь на главную.</p>
        <Link className="btn" to="/">На главную</Link>
      </div>
    );
  }

  const handleComplete = () => {
    if (!activeStep) return;
    onCompleteStep(course.id, activeStep.id);
    const nextIndex = Math.min(activeIndex + 1, steps.length - 1);
    setActiveIndex(nextIndex);
  };

  const canOpenStep = (index) => {
    if (index <= defaultIndex) return true;
    return false;
  };

  return (
    <div className="container">
      <button className="btn" onClick={() => navigate(-1)}>← Назад</button>
      <div className="section-title">
        <h2>{course.title}</h2>
        <span className="badge">Уровень: {level === "BASIC" ? "Базовый" : "Расширенный"}</span>
      </div>
      <p>{course.description}</p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
        <button className={`btn ${tab === "simulation" ? "btn-primary" : ""}`} onClick={() => setTab("simulation")}>Симуляция</button>
        <button className={`btn ${tab === "practice" ? "btn-primary" : ""}`} onClick={() => setTab("practice")}>Практика</button>
        <button className={`btn ${tab === "quiz" ? "btn-primary" : ""}`} onClick={() => setTab("quiz")}>Тест</button>
      </div>

      <div className="layout">
        <aside className="sidebar">
          <div className="card">
            <h3>Шаги</h3>
            <div className="step-list">
              {steps.map((step, index) => {
                const locked = !canOpenStep(index);
                const completed = completedSet.has(step.id);
                return (
                  <div
                    key={step.id}
                    className={`step-item ${locked ? "locked" : ""} ${index === activeIndex ? "active" : ""}`}
                    onClick={() => {
                      if (locked) return;
                      setActiveIndex(index);
                    }}
                  >
                    <span>{index + 1}. {step.title}</span>
                    <span>{completed ? "✅" : locked ? "🔒" : "➡"}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <Chatbot
            context={activeStep}
            onRequestHint={async () => {
              const response = await onRequestHint(course.id, activeStep.id);
              return response.hint || "Подсказка недоступна";
            }}
          />
        </aside>

        <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {tab === "simulation" && (
            <Simulation step={activeStep} onComplete={handleComplete} showHintCursor />
          )}
          {tab === "practice" && (
            <Practice tasks={course.practice?.tasks} steps={steps} />
          )}
          {tab === "quiz" && (
            <Quiz
              quiz={course.quiz}
              onSubmit={(result) => onSubmitQuiz(course.id, result)}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default Course;
