import { Link, useLocation } from "react-router-dom";

function TopBar({ user, onLogout, voiceEnabled, onToggleVoice, onHelp }) {
  const location = useLocation();
  return (
    <header className="topbar">
      <div className="logo">
        <span className="logo-title">MAX.Навыки</span>
        <span className="logo-sub">Доступное цифровое обучение</span>
      </div>
      <nav className="nav-actions">
        <Link className="btn" to="/">Главная</Link>
        <Link className="btn" to="/profile">Личный кабинет</Link>
        <button className="btn btn-secondary" onClick={onHelp}>
          Помощь
        </button>
        <button className="btn btn-outline" onClick={onToggleVoice}>
          {voiceEnabled ? "🔊 Озвучивание" : "🔈 Без озвучивания"}
        </button>
        {user ? (
          <button className="btn" onClick={onLogout}>
            Выйти
          </button>
        ) : (
          <Link
            className="btn btn-primary"
            to={location.pathname.startsWith("/auth") ? "/" : "/auth"}
          >
            Войти
          </Link>
        )}
      </nav>
    </header>
  );
}

export default TopBar;
