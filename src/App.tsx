import React, { useState } from 'react'
import Header from './components/Header'
import InputField from './components/InputField'
import ShowTask from './components/ShowTask'

export interface task {
  id: number,
  title: string,
  completed: boolean,
}

function App() {
  const [tasks, setTasks] = useState<task[]>([]);

  const addTask = (title: string) =>{
    const newTask: task = {
      id: Math.random(),
      title,
      completed: false,
    }
    setTasks(prevTasks => [...prevTasks, newTask]);
  }

  const editTask = (id: number, newTitle: string) => {
    setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, title: newTitle } : task));
  }

  const deleteTask = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }

  const completeTask = (id: number) => {
    setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  }

  return (
    <div className='flex h-screen flex-col'>
      <Header />
      <InputField addTask={addTask}/>
      <ShowTask tasks={tasks} editTask={editTask} deleteTask={deleteTask} completeTask={completeTask}/>
    </div>
  )
}

export default App