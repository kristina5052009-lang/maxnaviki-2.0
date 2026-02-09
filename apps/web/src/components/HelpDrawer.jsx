function HelpDrawer({ open, onClose, context }) {
  if (!open || !context) return null;

  return (
    <div className="help-drawer">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <h3>Помощь по шагу</h3>
        <button className="btn" onClick={onClose}>Закрыть</button>
      </div>
      <p><strong>Шаг:</strong> {context.title}</p>
      <p><strong>Инструкция:</strong> {context.instruction}</p>
      <p><strong>Подсказка:</strong> {context.help}</p>
      {context.expectedAction && (
        <p><strong>Что сделать:</strong> {context.expectedAction}</p>
      )}
    </div>
  );
}

export default HelpDrawer;
