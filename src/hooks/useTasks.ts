import { useState, useEffect } from "react";
import loadStoredTasks from "../loadTasks";

export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

export function useTasks(userId?: string) {
  const [prevUserId, setPrevUserId] = useState(userId);
  const [tasks, setTasks] = useState<Task[]>(() => loadStoredTasks(userId));

  // Sync tasks when user changes (login/logout)
  if (userId !== prevUserId) {
    setPrevUserId(userId);
    setTasks(loadStoredTasks(userId));
  }

  // Persist tasks ONLY for authenticated users
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`tasks_${userId}`, JSON.stringify(tasks));
    }
  }, [tasks, userId]);

  const addTask = (title: string, description: string, date: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      date,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const editTask = (
    id: string,
    newTitle: string,
    newDescription: string,
    newdate: string,
  ) => {
    if (!userId) return; // Editing restricted for unauthenticated users
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: newTitle,
              description: newDescription,
              date: newdate,
            }
          : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const completeTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return {
    tasks,
    setTasks,
    addTask,
    editTask,
    deleteTask,
    completeTask,
  };
}

export default useTasks;
