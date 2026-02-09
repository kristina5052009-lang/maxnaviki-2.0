import { useState } from "react";

function Quiz({ quiz, onSubmit }) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  if (!quiz) {
    return <div className="card">Тест пока не готов.</div>;
  }

  const handleSelect = (questionId, index) => {
    setAnswers((prev) => ({ ...prev, [questionId]: index }));
  };

  const handleSubmit = async () => {
    const maxScore = quiz.questions.length;
    let score = 0;
    quiz.questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) score += 1;
    });
    setResult({ score, maxScore });
    if (onSubmit) {
      await onSubmit({ score, maxScore });
    }
  };

  return (
    <div className="card">
      <h3>{quiz.title}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {quiz.questions.map((q) => (
          <div key={q.id}>
            <p><strong>{q.text}</strong></p>
            <div style={{ display: "grid", gap: 8 }}>
              {q.options.map((opt, index) => (
                <label key={opt} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    type="radio"
                    name={q.id}
                    value={index}
                    checked={answers[q.id] === index}
                    onChange={() => handleSelect(q.id, index)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16 }}>
        <button className="btn btn-primary" onClick={handleSubmit}>Проверить ответы</button>
      </div>
      {result && (
        <p style={{ marginTop: 12, color: result.score === result.maxScore ? "#2f7c4f" : "#9a5b14" }}>
          Результат: {result.score} из {result.maxScore}
        </p>
      )}
    </div>
  );
}

export default Quiz;
