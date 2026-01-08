import { TodoProvider } from './TodoContext'
import { FilterProvider } from './FilterContext'
import { ThemeProvider } from './ThemeContext'

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <TodoProvider>
        <FilterProvider>
          {children}
        </FilterProvider>
      </TodoProvider>
    </ThemeProvider>
  )
}
