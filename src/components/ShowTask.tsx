import type { Task } from '../App'
import TaskItem from './TaskItem'

interface ShowTaskProps {
  tasks: Task[]
  searchValue: string
  isSearching: boolean
  searchedTasks: Task[]
  editTask: (id: string, newTitle: string) => void
  deleteTask: (id: string) => void
  completeTask: (id: string) => void
}

function ShowTask({tasks, searchValue, isSearching, searchedTasks, editTask, deleteTask, completeTask}: ShowTaskProps) {
  return (
    isSearching ? (<div className='flex flex-col gap-4 justify-around items-center mt-12'>
      {searchedTasks && searchedTasks.length > 0 && searchedTasks.map((task, index)=>{
        return (<TaskItem task={task} editTask={editTask} deleteTask={deleteTask} completeTask={completeTask} index={index} />)
      })}
    </div>) : (
    <div className='flex flex-col gap-4 justify-around items-center mt-12'>
      {tasks && tasks.length > 0 && tasks.map((task, index)=>{
        return (<TaskItem task={task} editTask={editTask} deleteTask={deleteTask} completeTask={completeTask} index={index} />)
      })}
    </div>
  )
  )
}

export default ShowTask