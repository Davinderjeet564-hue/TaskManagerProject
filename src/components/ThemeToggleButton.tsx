import React from 'react'
import themeContext from '../themeContext'

function ThemeToggleButton() {
    const {theme, setTheme} = React.useContext(themeContext);

    const handleToggle = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }
  return (
    <button
        className='flex w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 justify-center items-center cursor-pointer'
        onClick={handleToggle}
        aria-label={`Toggle theme to ${theme === 'light' ? 'dark' : 'light'}`}
    >
      <span role='img' aria-hidden='true'>{theme === 'light' ? '☀️': '🌙'}</span>
    </button>
  )
}

export default ThemeToggleButton