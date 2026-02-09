import { useState } from "react";

function Chatbot({ context, onRequestHint }) {
  const [messages, setMessages] = useState([
    "Привет! Я виртуальный помощник. Могу подсказать текущий шаг."
  ]);
  const [loading, setLoading] = useState(false);

  const handleHint = async () => {
    if (!context) return;
    setLoading(true);
    try {
      const hint = await onRequestHint();
      setMessages((prev) => [...prev, `Подсказка: ${hint}`]);
    } catch (error) {
      setMessages((prev) => [...prev, "Не удалось получить подсказку, используйте описание шага."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot">
      <h4>Помощник MAX</h4>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">{msg}</div>
        ))}
      </div>
      <button className={`btn ${loading ? "btn-disabled" : "btn-secondary"}`} onClick={handleHint} disabled={loading}>
        {loading ? "Думаю..." : "Подсказать шаг"}
      </button>
    </div>
  );
}

export default Chatbot;
