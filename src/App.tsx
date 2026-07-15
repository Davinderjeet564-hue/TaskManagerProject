import React, { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import ShowTask from './components/ShowTask'
import themeContext from './themeContext';
import AddTaskModalForm from './components/AddTaskModalForm';
import { IoMdSearch } from 'react-icons/io';
import AllTasks from './components/AllTasks';
import Footer from './components/Footer';

export interface Task {
  id: string,
  title: string,
  description: string,
  date: string,
  completed: boolean,
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(
    () => localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks') || '[]') : []
  );

  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light');
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchedTasks, setSearchedTasks] = useState<Task[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editableTitle, setEditableTitle] = useState<string>('');
  const [editableDescription, setEditableDescription] = useState<string>('');
  const [taskId, setTaskId] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [showAllTasks, setShowAllTasks] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    const root = document.documentElement;
    root.style.transition = 'all 0.3s ease';

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (editingTask) {
      setEditableTitle(editingTask.title);
      setEditableDescription(editingTask.description);
      setTaskId(editingTask.id);
    }
  }, [editingTask]);

  const addTask = (title: string, description: string, date: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      date,
      completed: false,
    }
    setTasks(prevTasks => [...prevTasks, newTask]);
  }

  const editTask = (id: string, newTitle: string, newDescription: string, newdate: string) => {
    setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, title: newTitle, description: newDescription, date: newdate } : task));
  }

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }

  const completeTask = (id: string) => {
    setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  }

  const searchTasks = (value: string) => {
    setSearchedTasks(tasks.filter(task => task.title.toLowerCase().includes(value.toLowerCase())));
  }

  const handleCloseModal = () => {
    setIsAddTaskModalOpen(false);
    setEditingTask(null); // Reset editing state
  }

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {showAllTasks ? (
        <div className="flex min-h-screen flex-col transition-colors duration-300 bg-gray-100 dark:bg-gray-900">
          <Header onClick={() => setShowAllTasks(false)}/>
          <div className="flex flex-col justify-end items-center gap-5 mt-4 mr-8">
            <AllTasks tasks={tasks} searchedTasks={searchedTasks} searchValue={searchValue} setSearchValue={setSearchValue} isSearching={isSearching} setIsSearching={setIsSearching} searchTasks={searchTasks} setEditingTask={setEditingTask} deleteTask={deleteTask} completeTask={completeTask} setIsAddTaskModalOpen={setIsAddTaskModalOpen} setShowAllTasks={setShowAllTasks} />
            <Footer />
          </div>
        </div>
      ) : (
        <div className='flex min-h-screen flex-col transition-colors duration-300 bg-gray-100 dark:bg-gray-900'>
          <Header />
          <div className="flex flex-row justify-end items-center gap-5 mt-4 mr-8">
            <div className='relative w-full max-w-md mx-auto mt-12 px-4'>
              <input 
                type="text" 
                ref={inputRef} 
                className='w-full border border-gray-300 rounded-md p-4 pl-4 pr-12 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300 focus:outline-none dark:bg-gray-700 dark:text-gray-100 dark:focus:border-indigo-300 dark:focus:ring-2 dark:focus:outline-none transition-colors duration-300' 
                placeholder='Search Task' 
                value={searchValue} 
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchValue(value);
                  setIsSearching(value.length > 0);
                  searchTasks(value)
                }} />
              <IoMdSearch size={24} 
              className="text-gray-500 dark:text-gray-400 absolute right-8 top-1/2 -translate-y-1/2 transition-colors duration-300 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 dark:focus:text-indigo-500" onClick={() => { inputRef.current?.focus() }} />
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-5 mt-12 mb-8">
            <button onClick={() => { setIsAddTaskModalOpen(true) }} title="Add Task" className='w-32 text-md mt-4 ml-4 bg-blue-500 hover:bg-blue-700 text-white dark:text-gray-100 font-bold py-2 px-4 rounded-xl cursor-pointer transition-colors'>Add Task</button>
          </div>
          {isAddTaskModalOpen && (
            <AddTaskModalForm
              editingTask={editingTask}
              EditableTitle={editableTitle}
              EditableDescription={editableDescription}
              setEditableDescription={setEditableDescription}
              taskId={taskId}
              addTask={addTask}
              editTask={editTask}
              handleCloseModal={handleCloseModal}

            />
          )}

          {tasks.length > 0 ? <ShowTask showAllTasks={showAllTasks} setShowAllTasks={setShowAllTasks} tasks={tasks} searchValue={searchValue} setEditingTask={setEditingTask} isSearching={isSearching} searchedTasks={searchedTasks} deleteTask={deleteTask} completeTask={completeTask} setIsAddTaskModalOpen={setIsAddTaskModalOpen} /> : editingTask ? (
            <AddTaskModalForm
              editingTask={editingTask}
              EditableTitle={editableTitle}
              EditableDescription={editableDescription}
              setEditableDescription={setEditableDescription}
              taskId={taskId}
              addTask={addTask}
              editTask={editTask}
              handleCloseModal={handleCloseModal}
            />
          ) : (
            <div className='flex flex-col justify-center items-center mt-8'>
              <svg className='opacity-50' width="96" height="96" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M38 43H10C8.34315 43 7 41.6569 7 40V8C7 6.34315 8.34315 5 10 5H19.9844C20.5366 5 21.069 5.21071 21.4452 5.61421L28.5548 13.3858C28.9309 13.7893 29.4634 14 30.0156 14H38C39.6569 14 41 15.3431 41 17V40C41 41.6569 39.6569 43 38 43Z" stroke="#9CA3AF" stroke-width="4" /><path d="M22 26H26" stroke="#9CA3AF" stroke-width="4" stroke-linecap="round" /><path d="M18 32H30" stroke="#9CA3AF" stroke-width="4" stroke-linecap="round" /></svg>
              <p className='text-2xl font-semibold opacity-50 dark:text-gray-100'>No Tasks Found</p>
            </div>
          )}
          <Footer />
        </div>)}
    </themeContext.Provider>
  )
}

export default App
