import React, { useState } from "react";
import type { Task } from "../App";

interface TaskItemProps {
  task: Task;
  editTask: (id: string, newTitle: string) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  index: number;
}

function TaskItem({
  task,
  editTask,
  deleteTask,
  completeTask,
  index,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(task.title);

  const handleSave = () => {
    if (localTitle.trim() === "") return;
    editTask(task.id, localTitle);
    setIsEditing(false);
  };

  return (
    <li
      key={task.id}
      className="flex flex-row justify-between items-center bg-gray-300 dark:bg-gray-800 w-full max-w-md p-5 rounded-4xl transition-colors duration-300"
    >
      <input
        type="checkbox"
        checked={task.completed}
        aria-label={`Complete task ${index + 1}`}
        onChange={() => completeTask(task.id)}
        className="scale-140 cursor-pointer"
      />
      {isEditing ? (
        <input
          type="text"
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          className="border border-gray-400 rounded px-2 py-1 dark:bg-gray-700 dark:text-gray-100"
          disabled={task.completed}
        />
      ) : (
        <span
          className={`pl-4 text-xl font-semibold ${task.completed ? "line-through opacity-50" : ""} dark:text-gray-200 transition-colors duration-300`}
        >
          {index + 1}.{task.title}
        </span>
      )}
      {/*Cancel editing when task is completed*/}
      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={() => handleSave()}
            className="bg-green-500 hover:bg-green-700 text-white dark:text-gray-100 font-bold py-2 px-4 rounded-xl cursor-pointer transition-colors"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white dark:text-gray-100 font-bold py-2 px-4 rounded-xl cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={task.completed}
          >
            Edit
          </button>
        )}
        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-500 hover:bg-red-700 text-white dark:text-gray-100 font-bold py-2 px-4 rounded-xl cursor-pointer transition-colors ml-2"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
