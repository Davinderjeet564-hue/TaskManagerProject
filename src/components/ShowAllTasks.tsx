import { useRef } from "react";
import { LuNotebookPen } from "react-icons/lu";
import type { Task } from "../App";
import TaskItem from "./TaskItem";
import SearchBar from "./SearchBar";
import EmptyState from "./EmptyState";

interface ShowAllTasksProps {
  tasks: Task[];
  searchedTasks: Task[];
  searchValue: string;
  isSearching: boolean;
  setSearchValue: (value: string) => void;
  setIsSearching: (value: boolean) => void;
  searchTasks: (value: string) => void;
  setEditingTask: (task: Task | null) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  setIsAddTaskModalOpen: (value: boolean) => void;
  setShowAllTasks: (value: boolean) => void;
  onOpenAuthModal?: () => void;
}

function ShowAllTasks({
  tasks,
  searchedTasks,
  searchValue,
  setSearchValue,
  isSearching,
  setIsSearching,
  searchTasks,
  setEditingTask,
  deleteTask,
  completeTask,
  setIsAddTaskModalOpen,
  setShowAllTasks,
  onOpenAuthModal,
}: ShowAllTasksProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex min-h-auto w-full max-w-md md:max-w-2xl lg:max-w-4xl flex-col transition-colors duration-300 bg-gray-100 dark:bg-gray-900 px-2 sm:px-4">
      <div className="flex flex-row justify-between items-center min-h-auto gap-4 mt-4 mb-6">
        <h2 className="text-2xl font-semibold tracking-wide text-gray-800 dark:text-gray-200">
          All Tasks
        </h2>
        <button
          className="bg-none text-gray-600 dark:text-gray-400 py-2 px-4 rounded-xl hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
          onClick={(e) => {
            e.preventDefault();
            setShowAllTasks(false);
          }}
        >
          Go Back
        </button>
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-4 min-h-auto mb-6">
        <div className="flex-1 flex flex-col gap-4 w-full">
          {/* Search Bar */}
          <SearchBar
            inputRef={inputRef}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            setIsSearching={setIsSearching}
            searchTasks={searchTasks}
          />
        </div>

        {/* Cards List Area */}
        <div className="flex-1 flex flex-col gap-4 w-full">
          {(isSearching ? searchedTasks : tasks)?.length > 0 ? (
            (isSearching ? searchedTasks : tasks).map((task, index) => (
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
            ))
          ) : (
            <EmptyState
              message="No tasks found."
              icon={<LuNotebookPen size={48} color="currentColor" className="mb-2" />}
              className="mt-0 text-gray-500 dark:text-gray-400"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowAllTasks;
