import { useState } from "react";

function Auth({ onLogin, onRegister }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    login: "",
    email: "",
    phone: "",
    snils: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await onLogin({ login: form.login, password: form.password });
      } else {
        await onRegister({
          name: form.name,
          email: form.email || undefined,
          phone: form.phone || undefined,
          snils: form.snils || undefined,
          password: form.password
        });
      }
    } catch (err) {
      setError(err.message || "Ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
        <h2>{mode === "login" ? "Вход" : "Регистрация"}</h2>
        <p>Используйте телефон, email или СНИЛС (для Госуслуг).</p>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          {mode === "register" && (
            <label>
              Имя
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </label>
          )}

          {mode === "login" ? (
            <label>
              Телефон / Email / СНИЛС
              <input
                type="text"
                required
                value={form.login}
                onChange={(e) => update("login", e.target.value)}
              />
            </label>
          ) : (
            <>
              <label>
                Email (необязательно)
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </label>
              <label>
                Телефон (необязательно)
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </label>
              <label>
                СНИЛС (необязательно)
                <input
                  type="text"
                  value={form.snils}
                  onChange={(e) => update("snils", e.target.value)}
                  placeholder="11223344595"
                />
              </label>
            </>
          )}

          <label>
            Пароль
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
            />
          </label>

          {error && <p style={{ color: "#b6462f" }}>{error}</p>}

          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Подождите..." : mode === "login" ? "Войти" : "Создать аккаунт"}
          </button>
        </form>
        <button className="btn" style={{ marginTop: 12 }} onClick={() => setMode(mode === "login" ? "register" : "login")}>
          {mode === "login" ? "Нет аккаунта? Регистрация" : "Уже есть аккаунт? Войти"}
        </button>
      </div>
    </div>
  );
}

export default Auth;
