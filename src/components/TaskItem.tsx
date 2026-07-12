import React, { useState } from "react";
import type { Task } from "../App";


interface TaskItemProps {
  task: Task;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
  editTask: (id: string, newTitle: string, newDescription: string, newDate: string) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  index: number;
  setIsAddTaskModalOpen: (value: boolean) => void;
}

function TaskItem({
  task,
  editingTask,
  setEditingTask,
  editTask,
  deleteTask,
  completeTask,
  index,
  setIsAddTaskModalOpen,
}: TaskItemProps) {
  const [localTitle, setLocalTitle] = useState(task.title);
  const [localDescription, setLocalDescription] = useState(task.description)

  const handleSave = () => {
    if (localTitle.trim() === "") return;
    editTask(task.id, localTitle, localDescription, task.date);
  };

  return (
    <li
      key={task.id}
      className="flex flex-row justify-between items-center bg-gray-300 dark:bg-gray-800 w-full h-36 overflow-visible p-5 rounded-4xl mx-4 transition-colors duration-300"
    >
      <input
        type="checkbox"
        checked={task.completed}
        aria-label={`Complete task ${index + 1}`}
        onChange={() => completeTask(task.id)}
        className="scale-140 cursor-pointer"
      />
      (
        <div
          className={`flex flex-col flex-warp pl-4 font-semibold ${task.completed ? "line-through opacity-50" : ""} dark:text-gray-200 transition-colors duration-300`}
        >
          <h2 className="text-3xl dark:text-gray-200 mb-2">{task.title}</h2>
          <p className="text-sm dark:text-gray-200 indent-4">{task.description}</p>
        </div>
      )
      {/*Cancel editing when task is completed*/}
      <div className="flex flex-col gap-4 dark:text-gray-200">
        <div className="flex gap-2">
            <button
              onClick={() => {
                if (task.completed) return;
                setEditingTask(task);
                setIsAddTaskModalOpen(true);
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white dark:text-gray-100 font-bold py-2 px-4 rounded-xl cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={task.completed}
            >
              Edit
            </button>
          
          <button
            onClick={() => deleteTask(task.id)}
            className="bg-red-500 hover:bg-red-700 text-white dark:text-gray-100 font-bold py-2 px-4 rounded-xl cursor-pointer transition-colors ml-2"
          >
            Delete
          </button>
        </div>
        <p>Date added:{task.date}</p>
      </div>
    </li>
  );
}

export default TaskItem;
