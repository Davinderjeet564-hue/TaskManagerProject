import React from 'react'
import ThemeToggleButton from './ThemeToggleButton'

function Header() {
  return (
    <div className="flex flex-row justify-between items-center bg-gray-300 w-full p-5 dark:bg-gray-800 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Task Manager</h2>
        <ThemeToggleButton />
    </div>
  )
}

export default Header