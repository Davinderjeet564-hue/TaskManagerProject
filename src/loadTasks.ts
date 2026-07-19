function loadStoredTasks(userId?: string) {
  // Unauthenticated users do not persist tasks (lost on refresh/logout)
  if (!userId) {
    return [];
  }

  try {
    const raw = localStorage.getItem(`tasks_${userId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default loadStoredTasks;