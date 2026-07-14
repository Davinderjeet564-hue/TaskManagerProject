import { LuNotebookPen } from "react-icons/lu";
import type { Task } from "../App"
import TaskItem from "./TaskItem"
import { FaSearch } from 'react-icons/fa'; // Optional: for icons


interface AllTasksProps {
  tasks: Task[]
  searchedTasks: Task[]
  searchValue: string
  isSearching: boolean
  setSearchValue: (value: string) => void
  setIsSearching: (value: boolean) => void
  searchTasks: (value: string) => void
  setEditingTask: (task: Task | null) => void
  deleteTask: (id: string) => void
  completeTask: (id: string) => void
  setIsAddTaskModalOpen: (value: boolean) => void
  setShowAllTasks: (value: boolean) => void
}

function AllTasks({ tasks, searchedTasks, searchValue, setSearchValue, isSearching, setIsSearching, searchTasks, setEditingTask, deleteTask, completeTask, setIsAddTaskModalOpen, setShowAllTasks }: AllTasksProps) {
  return (
    <div className="flex min-h-auto flex-col transition-colors duration-300 bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-row justify-between items-start min-h-auto gap-4 ml-4v mt-4">
        <h2 className="text-2xl font-semibold tracking-wide mb-6 text-gray-800 dark:text-gray-200">All Tasks</h2>
        <button className="bg-none text-gray-600 dark:text-gray-400 py-2 px-4 rounded-xl hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700" onClick={(e) => {
          e.preventDefault();
          setShowAllTasks(false);
        }}>
          Go Back
        </button>
      </div>
      <div className="flex flex-col items-center justify-center p-4 gap-4 min-h-auto ">
        {/* Search Bar */}
        <div className="relative mb-8 w-full max-w-xl">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent border border-white/20 rounded-2xl py-3.5 px-4 text-white placeholder-gray-500 outline-none focus:border-white transition-colors"
            value={searchValue} onChange={(e) => {
              const value = e.target.value;
              setSearchValue(value);
              setIsSearching(value.length > 0);
              searchTasks(value)
            }}
          />
          <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* Cards List Area */}
        <div className="flex-1 flex flex-col gap-4">
          {(isSearching ? searchedTasks : tasks)?.length > 0 ? (
            (isSearching ? searchedTasks : tasks).map((task, index) => (
              <div
                key={task.id}
                className="w-lg h-auto rounded-2xl border border-white/20 bg-transparent hover:bg-white/5 transition-colors cursor-pointer"
              >
                <TaskItem
                  task={task}
                  setEditingTask={setEditingTask}
                  setIsAddTaskModalOpen={setIsAddTaskModalOpen}
                  deleteTask={deleteTask}
                  completeTask={completeTask}
                  index={index}
                />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
              <LuNotebookPen size={48} color="currentColor" className="mb-2 " />
              <p className="text-gray-500 dark:text-gray-400">No tasks found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AllTasks