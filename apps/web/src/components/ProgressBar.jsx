function ProgressBar({ value, max }) {
  const percent = max === 0 ? 0 : Math.round((value / max) * 100);
  return (
    <div className="progress-bar" aria-label={`Прогресс ${percent}%`}>
      <span style={{ width: `${percent}%` }} />
    </div>
  );
}

export default ProgressBar;
