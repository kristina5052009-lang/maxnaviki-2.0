import ProgressBar from "../components/ProgressBar.jsx";

function Profile({ user, stats, achievements, level, onLevelChange }) {
  if (!user) {
    return (
      <div className="container">
        <h2>Личный кабинет</h2>
        <p>Войдите, чтобы видеть прогресс и достижения.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="section-title">
        <h2>Личный кабинет</h2>
        <span className="badge">{user.name}</span>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <h3>Уровень сложности</h3>
        <div className="level-switch">
          <button
            className={`btn ${level === "BASIC" ? "btn-primary" : ""}`}
            onClick={() => onLevelChange("BASIC")}
          >
            Базовый
          </button>
          <button
            className={`btn ${level === "ADVANCED" ? "btn-primary" : ""}`}
            onClick={() => onLevelChange("ADVANCED")}
          >
            Расширенный
          </button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <h3>Статистика</h3>
        <p>Выполнено шагов: {stats?.totalCompleted || 0} из {stats?.totalSteps || 0}</p>
        <ProgressBar value={stats?.totalCompleted || 0} max={stats?.totalSteps || 0} />
        <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
          {(stats?.perCourse || []).map((item) => (
            <div key={item.courseId}>
              <p><strong>{item.title}</strong> — {item.completed} из {item.total}</p>
              <ProgressBar value={item.completed} max={item.total} />
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Достижения</h3>
        {achievements && achievements.length > 0 ? (
          <div style={{ display: "grid", gap: 12 }}>
            {achievements.map((ach) => (
              <div key={ach.code} className="badge">🏆 {ach.title}</div>
            ))}
          </div>
        ) : (
          <p>Пока достижений нет. Выполните первые шаги, чтобы открыть награды.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
