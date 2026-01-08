import { useContext } from 'react'
import { ThemeContext } from './contexts/ThemeContext'
import { AppProviders } from './contexts/AppProviders'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import FilterButtons from './components/FilterButtons'
import ThemeToggleButton from './components/ThemeToggleButton'

function AppContent() {
  const { theme } = useContext(ThemeContext)

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        <header className="app-header">
          <h1>Todo App</h1>
          <ThemeToggleButton />
        </header>
        
        <main className="app-main">
          <TodoInput />
          <FilterButtons />
          <TodoList />
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  )
}

export default App
