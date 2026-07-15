import type { Task } from "../App";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import formatDate from "../utils/formatDate";


interface TaskItemProps {
  task: Task;
  setEditingTask: (task: Task | null) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  index: number;
  setIsAddTaskModalOpen: (value: boolean) => void;
}

function TaskItem({
  task,
  setEditingTask,
  deleteTask,
  completeTask,
  index,
  setIsAddTaskModalOpen,
}: TaskItemProps) {

  const [timeStr, dateStr] = formatDate(new Date(task.date));
  return (
    <li
      key={task.id}
      className="w-full max-w-md flex flex-row justify-between items-start gap-4 p-4 bg-gray-200 dark:bg-gray-800 rounded-xl shadow-md transition-colors duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setEditingTask(task);
          setIsAddTaskModalOpen(true);
        }
      }}
    >
      <input
        type="checkbox"
        title="Complete task"
        checked={task.completed}
        aria-label={`Complete task: ${index + 1}`}
        onChange={() => completeTask(task.id)}
        className="scale-140 cursor-pointer self-center accent-indigo-500 dark:accent-indigo-400 transition-colors duration-300"
      />

      <div
        className={`flex flex-col flex-wrap pl-4 font-semibold ${task.completed ? "opacity-70 text-gray-700 dark:text-gray-700" : "text-gray-800 dark:text-gray-200"} dark:text-gray-200 transition-colors duration-300`}
      >
        <h2 className="text-xl font-bold dark:text-gray-200 mb-2 first-letter:capitalize">{task.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 indent-4 line-clamp-3">{task.description}</p>
      </div>

      {/*Cancel editing when task is completed*/}
      <div className="flex flex-col gap-4 dark:text-gray-200 transition-colors duration-300 self-start">
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              if (task.completed) return;
              setEditingTask(task);
              setIsAddTaskModalOpen(true);
            }}
            className="border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-xl cursor-pointer transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={task.completed}
            title="Edit Task"
          >
            <FaRegEdit />
          </button>

          <button
            onClick={() => deleteTask(task.id)}
            className="border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-xl cursor-pointer transition-colors duration-300"
            title="Delete Task"
          >
            <MdDeleteOutline />
          </button>
        </div>

        <div className="flex flex-col gap-1 text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">{timeStr}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{dateStr}</p>
        </div>
      </div>
    </li>
  );
}

export default TaskItem;
