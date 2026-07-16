import ThemeToggleButton from './ThemeToggleButton'

interface HeaderProps {
  onClick?: () => void;
}

function Header({ onClick }: HeaderProps) {
  return (
    <header className="flex flex-row justify-between items-center bg-gray-300 w-full p-5 dark:bg-gray-800 transition-colors duration-300">
        <h2 
          className={`text-2xl font-bold text-gray-900 dark:text-gray-100 ${onClick ? 'cursor-pointer select-none' : ''}`}
          onClick={onClick}
        >
          Task Manager
        </h2>
        <ThemeToggleButton />
    </header>
  )
}

export default Header