import { LuNotebookPen } from 'react-icons/lu'
import type { Task } from '../App'
import TaskItem from './TaskItem'

interface ShowTaskProps {
  tasks: Task[]
  searchValue: string
  isSearching: boolean
  setEditingTask: (task: Task | null) => void
  searchedTasks: Task[]
  deleteTask: (id: string) => void
  completeTask: (id: string) => void
  setIsAddTaskModalOpen: (value: boolean) => void
}

function ShowTask({tasks, isSearching, searchedTasks, deleteTask, completeTask, setIsAddTaskModalOpen, setEditingTask}: ShowTaskProps) {
  const orderedTasks = [...tasks].toSorted((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      {isSearching ? (
        <div className='p-6 bg-gray-100 min-h-auto dark:bg-gray-900 transition-colors duration-300'>
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Search Results</h2>
          {searchedTasks && searchedTasks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {searchedTasks.map((task, index)=> {
                return (<TaskItem task={task} setEditingTask={setEditingTask} setIsAddTaskModalOpen={setIsAddTaskModalOpen} deleteTask={deleteTask} completeTask={completeTask} index={index} />)
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
              <LuNotebookPen size={48} color="currentColor" className="mb-2 " />
                <p className="text-gray-500 dark:text-gray-400">No tasks found.</p>
              </div>
            )}
        </div>
      ) : (
        <div className="p-6 bg-gray-100 min-h-auto dark:bg-gray-900 transition-colors duration-300">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Recent Tasks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {orderedTasks && orderedTasks.length > 0 ? (
              orderedTasks.map((task, index)=> {
                if (index > 8) return null; // Limit to 9 tasks for display
                return (<TaskItem task={task} setEditingTask={setEditingTask} setIsAddTaskModalOpen={setIsAddTaskModalOpen} deleteTask={deleteTask} completeTask={completeTask} index={index} />)
              })
            ) : (
              <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
                <LuNotebookPen size={48} color="currentColor" className="mb-2 " />
                <p className="text-gray-500 dark:text-gray-400">No tasks found.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ShowTask