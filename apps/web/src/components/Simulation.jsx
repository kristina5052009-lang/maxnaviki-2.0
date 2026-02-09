import { useEffect, useState } from "react";

function Simulation({ step, onComplete, strict = false, showHintCursor = true }) {
  const [message, setMessage] = useState("Нажмите на подсвеченную область.");
  const [errors, setErrors] = useState(0);

  useEffect(() => {
    setMessage("Нажмите на подсвеченную область.");
    setErrors(0);
  }, [step?.id]);

  if (!step) {
    return <div className="card">Выберите шаг слева.</div>;
  }

  const handleHit = () => {
    setMessage("Отлично! Шаг выполнен.");
    onComplete();
  };

  const handleMiss = () => {
    if (strict) {
      setErrors((prev) => prev + 1);
      setMessage("Ошибка. Попробуйте снова без подсказок.");
    } else {
      setMessage("Почти! Нажмите на подсвеченную область.");
    }
  };

  const hotspotStyle = {
    left: `${step.hotspot.x}%`,
    top: `${step.hotspot.y}%`,
    width: `${step.hotspot.w}%`,
    height: `${step.hotspot.h}%`
  };

  const cursorStyle = {
    left: `${step.hotspot.x + step.hotspot.w / 2}%`,
    top: `${step.hotspot.y + step.hotspot.h / 2}%`
  };

  return (
    <div className="card">
      <div className="section-title">
        <h3>{step.title}</h3>
        {strict && <span className="badge">Практика без ошибок</span>}
      </div>
      <p>{step.instruction}</p>
      <p style={{ color: "#0f7c7a", fontWeight: 600 }}>{message}</p>
      {strict && errors > 0 && (
        <p style={{ color: "#b6462f" }}>Ошибок: {errors}</p>
      )}
      <div className="simulation">
        <div className="screen" onClick={handleMiss} role="button" aria-label="Экран симуляции">
          <img src={step.screenshot} alt="Скриншот интерфейса" />
          <div className="hotspot" style={hotspotStyle} onClick={(event) => {
            event.stopPropagation();
            handleHit();
          }} />
          {showHintCursor && <div className="cursor-hint" style={cursorStyle} />}
        </div>
        <div className="screencast">
          {step.screencast ? (
            <video src={step.screencast} controls />
          ) : (
            <>
              <strong>Скринкаст-демо</strong>
              <p>Здесь может быть короткое видео с демонстрацией шага.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Simulation;
