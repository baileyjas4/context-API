import { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react'
import { loadFromStorage, saveToStorage } from '../utils/localStorage'

const ThemeContext = createContext()

const STORAGE_KEY = 'theme'

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    return loadFromStorage(STORAGE_KEY, THEMES.LIGHT)
  })

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    saveToStorage(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setThemeState(prevTheme => 
      prevTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
    )
  }, [])

  const value = useMemo(() => ({
    theme,
    toggleTheme
  }), [theme, toggleTheme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export { ThemeContext }
