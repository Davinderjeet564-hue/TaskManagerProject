import React, { useState } from 'react'
import type { Task } from '../App'
import TaskItem from './TaskItem'

interface ShowTaskProps {
  tasks: Task[]
  editTask: (id: string, newTitle: string) => void
  deleteTask: (id: string) => void
  completeTask: (id: string) => void
}

function ShowTask({tasks, editTask, deleteTask, completeTask}: ShowTaskProps) {
  return (
    <div className='flex flex-col gap-4 justify-around items-center mt-12'>
      {tasks && tasks.length > 0 && tasks.map((task, index)=>{
        return (<TaskItem task={task} editTask={editTask} deleteTask={deleteTask} completeTask={completeTask} index={index} />)
      })}
    </div>
  )
}

export default ShowTask