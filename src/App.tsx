import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import InputField from './components/InputField'
import ShowTask from './components/ShowTask'
import themeContext from './themeContext';
import AddTaskModalForm from './components/AddTaskModalForm';

export interface Task {
  id: string,
  title: string,
  description: string,
  date: string,
  completed: boolean,
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(
    ()=>localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks') || '[]') : []
  );

  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light');
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchedTasks, setSearchedTasks] = useState<Task[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    const root = document.documentElement;
    root.style.transition = 'all 0.3s ease';

    if(theme === 'dark'){
      root.classList.add('dark');
    }else{
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const addTask = (title: string, description: string, date: string) =>{
    const newTask: Task = {
      id: crypto.randomUUID(), 
      title,
      description,
      date,
      completed: false,
    }
    setTasks(prevTasks => [...prevTasks, newTask]);
  }

  const editTask = (id: string, newTitle: string) => {
    setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, title: newTitle } : task));
  }

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }

  const completeTask = (id: string) => {
    setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  }

  const searchTasks = (value: string) =>{
    setSearchedTasks(tasks.filter(task => task.title.toLowerCase().includes(value.toLowerCase())));
  }

  return (
    <themeContext.Provider value={{theme, setTheme}}>
      <div className='flex min-h-screen flex-col transition-colors duration-300 bg-gray-100 dark:bg-gray-900'>
        <Header />
        <div className="flex flex-row justify-end items-center gap-5 mt-4 mr-8">
          <input type="text" className='w-md border border-gray-300 rounded-md p-4 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300 focus:outline-none dark:bg-gray-700 dark:text-gray-100 dark:focus:border-indigo-300 dark:focus:ring-2 dark:focus:outline-none transition-colors duration-300' placeholder='Search Task' value={searchValue}  onChange={(e)=>{
          const value = e.target.value;
          setSearchValue(value);
          setIsSearching(value.length > 0);
          searchTasks(value)}} /></div>
        <div className="flex flex-row justify-center items-center gap-5 mt-12 mb-8">
          <button onClick={()=>{setIsAddTaskModalOpen(true)}} className='w-32 text-md mt-4 ml-4 bg-blue-500 hover:bg-blue-700 text-white dark:text-gray-100 font-bold py-2 px-4 rounded-xl cursor-pointer transition-colors'>Add Task</button>
        </div>
        
      
        {isAddTaskModalOpen && <AddTaskModalForm addTask={addTask} setIsAddTaskModalOpen={setIsAddTaskModalOpen} />}
        {tasks.length > 0 ? <ShowTask tasks={tasks} searchValue={searchValue} isSearching={isSearching} searchedTasks={searchedTasks} editTask={editTask} deleteTask={deleteTask} completeTask={completeTask}/> : (
          <div className='flex flex-col justify-center items-center mt-8'>
            <svg className='opacity-50' width="96" height="96" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M38 43H10C8.34315 43 7 41.6569 7 40V8C7 6.34315 8.34315 5 10 5H19.9844C20.5366 5 21.069 5.21071 21.4452 5.61421L28.5548 13.3858C28.9309 13.7893 29.4634 14 30.0156 14H38C39.6569 14 41 15.3431 41 17V40C41 41.6569 39.6569 43 38 43Z" stroke="#9CA3AF" stroke-width="4"/><path d="M22 26H26" stroke="#9CA3AF" stroke-width="4" stroke-linecap="round"/><path d="M18 32H30" stroke="#9CA3AF" stroke-width="4" stroke-linecap="round"/></svg>
            <p className='text-2xl font-semibold opacity-50 dark:text-gray-100'>No Tasks Found</p>
          </div>
          )}
      </div>
    </themeContext.Provider>
  )
}

export default App