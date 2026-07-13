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
  return (
    <>
      {isSearching ? (
        <div className='p-6 bg-gray-100 min-h-auto dark:bg-gray-900 transition-colors duration-300'>
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Search Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {searchedTasks && searchedTasks.length > 0 && searchedTasks.map((task, index)=>{
              return (<TaskItem task={task} setEditingTask={setEditingTask} setIsAddTaskModalOpen={setIsAddTaskModalOpen} deleteTask={deleteTask} completeTask={completeTask} index={index} />)
            })}
          </div>
        </div>
      ) : (
        <div className="p-6 bg-gray-100 min-h-auto dark:bg-gray-900 transition-colors duration-300">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Recent Tasks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tasks && tasks.length > 0 && tasks.map((task, index)=>{
              return (<TaskItem task={task} setEditingTask={setEditingTask} setIsAddTaskModalOpen={setIsAddTaskModalOpen} deleteTask={deleteTask} completeTask={completeTask} index={index} />)
            })}
          </div>
        </div>
      )}
    </>
  )
}

export default ShowTask