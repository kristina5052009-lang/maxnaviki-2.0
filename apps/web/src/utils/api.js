const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    let message = "Ошибка запроса";
    try {
      const data = await response.json();
      message = data.error || message;
    } catch (error) {
      // ignore
    }
    throw new Error(message);
  }

  return response.json();
}

export async function fetchCourses() {
  return apiFetch("/api/courses");
}

export async function registerUser(payload) {
  return apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function loginUser(payload) {
  return apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function fetchProfile(token) {
  return apiFetch("/api/profile", {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function updateLevel(token, level) {
  return apiFetch("/api/profile/level", {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ level })
  });
}

export async function fetchProgress(token) {
  return apiFetch("/api/progress", {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function saveProgress(token, payload) {
  return apiFetch("/api/progress", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload)
  });
}

export async function getHint(courseId, stepId) {
  const params = new URLSearchParams({ courseId, stepId });
  return apiFetch(`/api/assistant/hint?${params.toString()}`);
}

export async function submitQuiz(token, payload) {
  return apiFetch("/api/quiz/submit", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload)
  });
}

export { API_URL };
