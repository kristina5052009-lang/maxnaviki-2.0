import CourseCard from "../components/CourseCard.jsx";

function Home({ courses, level, onLevelChange, progressSummary }) {
  return (
    <div className="container">
      <section className="hero">
        <div>
          <h1>Обучение цифровым навыкам для всех</h1>
          <p>
            Пошаговые симуляции, практика и тесты. Крупные элементы управления, голосовые инструкции
            и понятный интерфейс в стиле MAX.
          </p>
          <div className="level-switch">
            <button
              className={`btn ${level === "BASIC" ? "btn-primary" : ""}`}
              onClick={() => onLevelChange("BASIC")}
            >
              Базовый уровень
            </button>
            <button
              className={`btn ${level === "ADVANCED" ? "btn-primary" : ""}`}
              onClick={() => onLevelChange("ADVANCED")}
            >
              Расширенный уровень
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <h2>MAX.Навыки</h2>
          <p>
            Осваивайте смартфон, мессенджер MAX, онлайн‑покупки и Госуслуги. Все шаги выполняются
            последовательно, а прогресс сохраняется автоматически.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <span className="badge">Крупные кнопки</span>
            <span className="badge">Озвучивание</span>
            <span className="badge">Подсказки</span>
          </div>
        </div>
      </section>

      <div className="section-title">
        <h2>Темы обучения</h2>
      </div>
      <div className="course-grid">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            progress={progressSummary[course.id] || { completed: 0, total: 0 }}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
