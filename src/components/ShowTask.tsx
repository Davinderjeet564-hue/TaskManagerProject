import React, { useState } from 'react'
import type {task} from '../App'

interface ShowTaskProps {
  tasks: task[]
  editTask: (id: number, newTitle: string) => void
  deleteTask: (id: number) => void
  completeTask: (id: number) => void
}

function ShowTask({tasks, editTask, deleteTask, completeTask}: ShowTaskProps) {
  const [editingId, setEditingId] = useState<number | null>(null)
  
  return (
    <div className='flex flex-col gap-4 justify-around items-center mt-12'>
      {tasks && tasks.length > 0 && tasks.map((task, index)=>{
        const isEditing = editingId === task.id
        return (
          <div key={task.id} className='flex flex-row justify-between items-center bg-gray-300 dark:bg-gray-800 w-md p-5 rounded-4xl transition-colors duration-300'>
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => {
                // If we complete the task while editing it, exit edit mode
                if (!task.completed && isEditing) {
                  setEditingId(null)
                }
                completeTask(task.id)
              }} 
              className='scale-140 cursor-pointer' 
            />
            {isEditing ? (
              <input 
                type="text" 
                value={task.title} 
                onChange={(e)=>editTask(task.id, e.target.value)} 
                className='border border-gray-400 rounded px-2 py-1 dark:bg-gray-700 dark:text-gray-100'
                disabled={task.completed}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setEditingId(null)
                  }
                }}
              />
            ) : (
              <p className={`pl-4 text-2xl font-semibold ${task.completed ? 'line-through' : ''}`}><span className={`opacity-50 ${task.completed ? 'line-through' : ''}`}>{index + 1}.</span> {task.title}</p>
            )}
            {/*Cancel editing when task is completed*/}
            <div>
              {isEditing ? (
                <button 
                  onClick={() => setEditingId(null)} 
                  className='bg-green-500 hover:bg-green-700 text-white dark:text-gray-100 font-bold py-2 px-4 rounded-3xl cursor-pointer transition-colors focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300 focus:outline-none'
                >
                  Save
                </button>
              ) : (
                <button 
                  onClick={() => setEditingId(task.id)} 
                  className='bg-blue-500 rounded-3xl hover:bg-blue-700 text-white dark:text-gray-100 font-bold py-2 px-4  cursor-pointer transition-colors focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'
                  disabled={task.completed}
                >
                  Edit
                </button>
              )}
              <button 
                onClick={()=>deleteTask(task.id)} 
                className='bg-red-500 rounded-3xl hover:bg-red-700 text-white dark:text-gray-100 font-bold py-2 px-4 cursor-pointer transition-colors focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300 focus:outline-none ml-2'
              >
                Delete
              </button>
            </div>
          </div>
        ) 
      })}
    </div>
  )
}

export default ShowTask