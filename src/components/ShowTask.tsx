import type { Task } from '../App'
import TaskItem from './TaskItem'

interface ShowTaskProps {
  tasks: Task[]
  searchValue: string
  isSearching: boolean
  editingTask: Task | null
  setEditingTask: (task: Task | null) => void
  searchedTasks: Task[]
  editTask: (id: string, newTitle: string, newDescription: string, newDate: string) => void
  deleteTask: (id: string) => void
  completeTask: (id: string) => void
  setIsAddTaskModalOpen: (value: boolean) => void
}

function ShowTask({tasks, isSearching, searchedTasks, editTask, deleteTask, completeTask, setIsAddTaskModalOpen, editingTask, setEditingTask}: ShowTaskProps) {
  return (
    isSearching ? (<div className='flex flex-col gap-4 justify-around items-center mt-12'>
      {searchedTasks && searchedTasks.length > 0 && searchedTasks.map((task, index)=>{
        return (<TaskItem task={task} editingTask={editingTask} setEditingTask={setEditingTask} setIsAddTaskModalOpen={setIsAddTaskModalOpen} editTask={editTask} deleteTask={deleteTask} completeTask={completeTask} index={index} />)
      })}
    </div>) : (
    <div className='flex flex-row gap-2 justify-center items-center mt-12'>
      {tasks && tasks.length > 0 && tasks.map((task, index)=>{
        return (<TaskItem task={task} editingTask={editingTask} setEditingTask={setEditingTask} setIsAddTaskModalOpen={setIsAddTaskModalOpen} editTask={editTask} deleteTask={deleteTask} completeTask={completeTask} index={index} />)
      })}
    </div>
  )
  )
}

export default ShowTask