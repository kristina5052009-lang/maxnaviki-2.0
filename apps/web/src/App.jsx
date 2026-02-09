import { useEffect, useMemo, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import TopBar from "./components/TopBar.jsx";
import HelpDrawer from "./components/HelpDrawer.jsx";
import Home from "./pages/Home.jsx";
import Course from "./pages/Course.jsx";
import Profile from "./pages/Profile.jsx";
import Auth from "./pages/Auth.jsx";

import {
  fetchCourses,
  fetchProfile,
  fetchProgress,
  getHint,
  loginUser,
  registerUser,
  saveProgress,
  submitQuiz,
  updateLevel
} from "./utils/api.js";
import { clearState, loadState, saveLocalProgress, saveState } from "./utils/storage.js";

function App() {
  const navigate = useNavigate();
  const saved = loadState();

  const [courses, setCourses] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: "" });
  const [user, setUser] = useState(saved.user || null);
  const [token, setToken] = useState(saved.token || null);
  const [level, setLevel] = useState(saved.level || "BASIC");
  const [progress, setProgress] = useState(saved.localProgress || []);
  const [stats, setStats] = useState(null);
  const [achievements, setAchievements] = useState(saved.achievements || []);
  const [helpOpen, setHelpOpen] = useState(false);
  const [helpContext, setHelpContext] = useState(null);
  const [voiceEnabled, setVoiceEnabled] = useState(saved.voiceEnabled ?? true);

  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await fetchCourses();
        setCourses(data);
        setStatus({ loading: false, error: "" });
      } catch (error) {
        setStatus({ loading: false, error: "Не удалось загрузить темы. Запустите API." });
      }
    }
    loadCourses();
  }, []);

  useEffect(() => {
    if (!token) return;
    async function loadProfile() {
      try {
        const profile = await fetchProfile(token);
        setStats(profile.stats);
        setUser(profile.user);
        setAchievements(profile.achievements || []);
        saveState({ achievements: profile.achievements || [] });
      } catch (error) {
        console.error(error);
      }
    }
    loadProfile();
  }, [token]);

  useEffect(() => {
    if (!token) return;
    async function loadProgress() {
      try {
        const data = await fetchProgress(token);
        setProgress(data);
        saveLocalProgress(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadProgress();
  }, [token]);

  const progressSummary = useMemo(() => {
    const summary = {};
    courses.forEach((course) => {
      const steps = course.steps.filter((step) => level === "ADVANCED" || step.level === "BASIC");
      const completed = progress.filter(
        (item) => item.courseId === course.id && item.status === "COMPLETED"
      );
      summary[course.id] = {
        completed: completed.length,
        total: steps.length
      };
    });
    return summary;
  }, [courses, progress, level]);

  const handleCompleteStep = async (courseId, stepId) => {
    const exists = progress.some(
      (item) => item.courseId === courseId && item.stepId === stepId && item.status === "COMPLETED"
    );
    if (exists) return;

    const next = [
      ...progress,
      { courseId, stepId, status: "COMPLETED" }
    ];
    setProgress(next);
    saveLocalProgress(next);

    if (token) {
      try {
        const result = await saveProgress(token, {
          courseId,
          stepId,
          status: "COMPLETED"
        });
        if (result.achievements) {
          setAchievements(result.achievements);
          saveState({ achievements: result.achievements });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleLogin = async (payload) => {
    const result = await loginUser(payload);
    setUser(result.user);
    setToken(result.token);
    saveState({ user: result.user, token: result.token });
    navigate("/");
  };

  const handleRegister = async (payload) => {
    const result = await registerUser(payload);
    setUser(result.user);
    setToken(result.token);
    saveState({ user: result.user, token: result.token });
    navigate("/");
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setStats(null);
    clearState();
    navigate("/");
  };

  const handleLevelChange = async (nextLevel) => {
    setLevel(nextLevel);
    saveState({ level: nextLevel });

    if (token) {
      try {
        await updateLevel(token, nextLevel);
        const profile = await fetchProfile(token);
        setStats(profile.stats);
        setUser(profile.user);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleQuizSubmit = async (courseId, result) => {
    if (!token) return;
    try {
      await submitQuiz(token, { courseId, ...result });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app-shell">
      <TopBar
        user={user}
        onLogout={handleLogout}
        voiceEnabled={voiceEnabled}
        onToggleVoice={() => {
          const next = !voiceEnabled;
          setVoiceEnabled(next);
          saveState({ voiceEnabled: next });
        }}
        onHelp={() => setHelpOpen(true)}
      />

      {status.loading && <div className="container">Загрузка...</div>}
      {status.error && <div className="container">{status.error}</div>}

      {!status.loading && !status.error && (
        <Routes>
          <Route
            path="/"
            element={
              <Home
                courses={courses}
                level={level}
                onLevelChange={handleLevelChange}
                progressSummary={progressSummary}
              />
            }
          />
          <Route
            path="/course/:courseId"
            element={
              <Course
                courses={courses}
                level={level}
                progress={progress}
                onCompleteStep={handleCompleteStep}
                voiceEnabled={voiceEnabled}
                onSetHelpContext={setHelpContext}
                onRequestHint={getHint}
                onSubmitQuiz={handleQuizSubmit}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                user={user}
                stats={stats || { perCourse: [] }}
                achievements={achievements}
                level={level}
                onLevelChange={handleLevelChange}
              />
            }
          />
          <Route path="/auth" element={<Auth onLogin={handleLogin} onRegister={handleRegister} />} />
        </Routes>
      )}

      <HelpDrawer open={helpOpen} onClose={() => setHelpOpen(false)} context={helpContext} />
    </div>
  );
}

export default App;
