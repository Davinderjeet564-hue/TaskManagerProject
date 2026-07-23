import type { Task } from "../App";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import formatDate from "../utils/formatDate";
import { useAuth } from "../context/AuthContext";
import useRequireAuth from "../hooks/useRequireAuth";

interface TaskItemProps {
  task: Task;
  setEditingTask: (task: Task | null) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  index: number;
  setIsAddTaskModalOpen: (value: boolean) => void;
  onOpenAuthModal?: () => void;
}

function TaskItem({
  task,
  setEditingTask,
  deleteTask,
  completeTask,
  index,
  setIsAddTaskModalOpen,
}: TaskItemProps) {
  const { user } = useAuth();
  const requireAuth = useRequireAuth();
  const [timeStr, dateStr] = formatDate(task.date ? new Date(task.date) : new Date()) || ["", ""];

  const handleEditClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    requireAuth(() => {
      setEditingTask(task);
      setIsAddTaskModalOpen(true);
    });
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    requireAuth(() => deleteTask(task.id));
  };

  const handleCompleteClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    requireAuth(() => completeTask(task.id));
  };

  return (
    <li
      key={task.id}
      className="w-full flex flex-row justify-between items-start gap-4 p-4 bg-gray-200 dark:bg-gray-800 rounded-xl shadow-md transition-colors duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget && user) {
          handleEditClick();
        }
      }}
    >
      <input
        type="checkbox"
        title={user ? "Complete task" : "Sign in to complete tasks"}
        disabled={!user}
        checked={task.completed}
        aria-label={`Complete task: ${index + 1}`}
        onChange={handleCompleteClick}
        className={`scale-140 self-start mt-2.5 accent-indigo-500 dark:accent-indigo-400 transition-colors duration-300 ${
          !user ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      />

      <div
        className={`flex-1 min-w-0 flex flex-col pl-4 font-semibold ${
          task.completed
            ? "opacity-70 text-gray-700 dark:text-gray-700"
            : "text-gray-800 dark:text-gray-200"
        } dark:text-gray-200 transition-colors duration-300`}
      >
        <h2 className="text-xl font-bold dark:text-gray-200 mb-2 first-letter:capitalize truncate sm:whitespace-normal line-clamp-1">
          {task.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 indent-4 line-clamp-3 break-words">
          {task.description}
        </p>
      </div>

      <div className="flex flex-col gap-3 shrink-0 items-end self-start dark:text-gray-200 transition-colors duration-300">
        <div className="flex gap-2 justify-end">
          <button
            onClick={handleEditClick}
            disabled={!user}
            className={`border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold p-2 sm:py-2 sm:px-4 rounded-xl transition-colors duration-300 ${
              !user
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
            }`}
            title={user ? "Edit Task" : "Sign in to edit tasks"}
          >
            <FaRegEdit />
          </button>

          <button
            onClick={handleDeleteClick}
            disabled={!user}
            className={`border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold p-2 sm:py-2 sm:px-4 rounded-xl transition-colors duration-300 ${
              !user
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
            }`}
            title={user ? "Delete Task" : "Sign in to delete tasks"}
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
