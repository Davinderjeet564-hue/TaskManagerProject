import { createContext } from "react";
import type { Task } from "../App";

export const taskContext = createContext<{
  tasks: Task[];
  addTask: (title: string, description: string, date: string) => void;
  editTask: (id: string, newTitle: string, newDescription: string, newDate: string) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
}>({ tasks: [], addTask: () => {}, editTask: () => {}, deleteTask: () => {}, completeTask: () => {} });