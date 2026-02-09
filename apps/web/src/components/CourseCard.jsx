import { Link } from "react-router-dom";

function CourseCard({ course, progress }) {
  const percent = progress.total === 0 ? 0 : Math.round((progress.completed / progress.total) * 100);

  return (
    <div className="card course-card">
      <div className="course-cover">
        <img src={course.cover} alt={course.title} />
      </div>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <div className="progress-bar" aria-label={`Прогресс ${percent}%`}>
        <span style={{ width: `${percent}%` }} />
      </div>
      <p><strong>{progress.completed}</strong> из {progress.total} шагов</p>
      <Link className="btn btn-primary" to={`/course/${course.id}`}>Открыть тему</Link>
    </div>
  );
}

export default CourseCard;
