function loadStoredTasks() {
  try {
    const raw = localStorage.getItem("tasks");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default loadStoredTasks;