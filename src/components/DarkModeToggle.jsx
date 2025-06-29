import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const DarkModeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        theme-toggle-btn
        ${isDark ? 'dark-mode' : 'light-mode'}
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="toggle-icon">
        {isDark ? (
          // Sun icon for dark mode (to switch to light)
          <Sun className="h-5 w-5 text-yellow-500" />
        ) : (
          // Moon icon for light mode (to switch to dark)
         <Moon className="h-5 w-5 text-gray-800" />
        )}
      </div>
    </button>
  );
};

export default DarkModeToggle;