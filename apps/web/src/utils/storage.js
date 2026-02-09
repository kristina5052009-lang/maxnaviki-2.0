const KEY = "max_skills_state";

export function loadState() {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch (error) {
    return {};
  }
}

export function saveState(next) {
  if (typeof window === "undefined") return;
  const prev = loadState();
  const merged = { ...prev, ...next };
  localStorage.setItem(KEY, JSON.stringify(merged));
}

export function clearState() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

export function saveLocalProgress(progress) {
  saveState({ localProgress: progress });
}
