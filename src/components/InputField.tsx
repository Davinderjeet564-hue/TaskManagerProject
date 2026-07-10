import React, { useState } from 'react'

interface InputFieldProps {
  addTask: (title: string) => void
}

function InputField({addTask}: InputFieldProps) {
  const [inputValue, setInputValue] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setInputValue(e.target.value)
  }

  return (
    <div className="flex flex-row justify-center items-center gap-5 mt-4">
        <input type="text" id="taskInput" placeholder='Enter Task Name' value={inputValue} onChange={handleChange} className='w-md border border-gray-300 rounded-md p-4 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300 focus:outline-none dark:bg-gray-700 dark:text-gray-100 dark:focus:border-indigo-300 dark:focus:ring-2 dark:focus:outline-none'/>
        <button type="submit" onClick={()=>{
          if (inputValue.trim() === '') return;
          addTask(inputValue)
          setInputValue('')
          }} className='w-32 rounded-3xl bg-blue-500 hover:bg-blue-700 text-white dark:text-gray-100 font-bold py-2 px-4 cursor-pointer transition-colors focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300 focus:outline-none dark:focus:border-indigo-300 dark:focus:ring-2 dark:focus:ring-indigo-300 dark:focus:outline-none'>Add Task</button>
    </div>
  )
}

export default InputField