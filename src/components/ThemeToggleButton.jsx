import { useTheme, THEMES } from '../contexts/ThemeContext'

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-button"
      title={`Switch to ${theme === THEMES.LIGHT ? 'dark' : 'light'} theme`}
    >
      {theme === THEMES.LIGHT ? 'moon' : 'sun'}
      <span className="theme-label">
        {theme === THEMES.LIGHT ? 'Dark' : 'Light'} Mode
      </span>
    </button>
  )
}

export default ThemeToggleButton
