import ThemeToggleButton from './ThemeToggleButton';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiUser } from 'react-icons/fi';

interface HeaderProps {
  onClick?: () => void;
  onOpenAuthModal?: () => void;
}

function Header({ onClick, onOpenAuthModal }: HeaderProps) {
  const { user, signOut } = useAuth();

  const userDisplayName =
    user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  return (
    <header className="flex flex-row justify-between items-center bg-gray-300 w-full p-5 dark:bg-gray-800 transition-colors duration-300 gap-4">
      <h2
        className={`text-2xl font-bold text-gray-900 dark:text-gray-100 ${
          onClick ? 'cursor-pointer select-none' : ''
        }`}
        onClick={onClick}
      >
        Task Manager
      </h2>

      <div className="flex items-center gap-3">
        <ThemeToggleButton />

        {user ? (
          <div className="flex items-center gap-3 bg-gray-200 dark:bg-gray-700 px-3 py-1.5 rounded-xl border border-gray-300 dark:border-gray-600">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                {userDisplayName.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline">{userDisplayName}</span>
            </div>
            <button
              onClick={() => signOut()}
              title="Sign Out"
              className="p-1.5 text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <FiLogOut size={18} />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl shadow-xs transition-colors"
          >
            <FiUser size={16} />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;