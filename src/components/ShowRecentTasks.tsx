import { LuNotebookPen } from "react-icons/lu";
import type { Task } from "../App";
import TaskItem from "./TaskItem";
import { useMemo } from "react";
import EmptyState from "./EmptyState";

interface ShowRecentTasksProps {
  tasks: Task[];
  setShowAllTasks: (value: boolean | ((prev: boolean) => boolean)) => void;
  searchValue: string;
  isSearching: boolean;
  setEditingTask: (task: Task | null) => void;
  searchedTasks: Task[];
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  setIsAddTaskModalOpen: (value: boolean) => void;
  onOpenAuthModal?: () => void;
}

function ShowRecentTasks({
  tasks,
  setShowAllTasks,
  isSearching,
  searchedTasks,
  deleteTask,
  completeTask,
  setIsAddTaskModalOpen,
  setEditingTask,
  onOpenAuthModal,
}: ShowRecentTasksProps) {
  const orderedTasks = useMemo(
    () => [...tasks].toSorted((a, b) => b.date.localeCompare(a.date)),
    [tasks],
  );

  return (
    <>
      {isSearching ? (
        <div className="p-6 bg-gray-100 min-h-auto dark:bg-gray-900 transition-colors duration-300">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            Search Results
          </h2>
          {searchedTasks && searchedTasks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-stretch">
              {searchedTasks.map((task, index) => {
                return (
                  <div key={task.id} className="w-full">
                    <TaskItem
                      task={task}
                      setEditingTask={setEditingTask}
                      setIsAddTaskModalOpen={setIsAddTaskModalOpen}
                      deleteTask={deleteTask}
                      completeTask={completeTask}
                      index={index}
                      onOpenAuthModal={onOpenAuthModal}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              message="No tasks found."
              icon={<LuNotebookPen size={48} color="currentColor" className="mb-2" />}
              className="mt-0 text-gray-500 dark:text-gray-400"
            />
          )}
        </div>
      ) : (
        <div className="p-6 bg-gray-100 min-h-auto dark:bg-gray-900 transition-colors duration-300">
          <div className="flex flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Recent Tasks
            </h2>
            <button
              className="bg-none text-gray-600 dark:text-gray-400 py-2 px-4 hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              onClick={() => {
                setShowAllTasks((prev) => !prev);
              }}
            >
              See all
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-stretch">
            {orderedTasks && orderedTasks.length > 0 ? (
              orderedTasks.map((task, index) => {
                if (index > 8) return null; // Limit to 9 tasks for display
                return (
                  <div key={task.id} className="w-full">
                    <TaskItem
                      task={task}
                      setEditingTask={setEditingTask}
                      setIsAddTaskModalOpen={setIsAddTaskModalOpen}
                      deleteTask={deleteTask}
                      completeTask={completeTask}
                      index={index}
                      onOpenAuthModal={onOpenAuthModal}
                    />
                  </div>
                );
              })
            ) : (
              <div className="col-span-full">
                <EmptyState
                  message="No tasks found."
                  icon={<LuNotebookPen size={48} color="currentColor" className="mb-2" />}
                  className="mt-0 text-gray-500 dark:text-gray-400"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ShowRecentTasks;
