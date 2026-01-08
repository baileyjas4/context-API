import { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react'
import { loadFromStorage, saveToStorage } from '../utils/localStorage'

const TodoContext = createContext()

const STORAGE_KEY = 'todos'

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return action.payload
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: Date.now().toString(),
          text: action.payload,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload)
    case 'EDIT_TODO':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      )
    case 'CLEAR_COMPLETED':
      return state.filter(todo => !todo.completed)
    default:
      return state
  }
}

export function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, [])

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = loadFromStorage(STORAGE_KEY, [])
    if (savedTodos.length > 0) {
      dispatch({ type: 'SET_TODOS', payload: savedTodos })
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    saveToStorage(STORAGE_KEY, todos)
  }, [todos])

  const addTodo = useCallback((text) => {
    if (text.trim()) {
      dispatch({ type: 'ADD_TODO', payload: text.trim() })
    }
  }, [])

  const toggleTodo = useCallback((id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id })
  }, [])

  const deleteTodo = useCallback((id) => {
    dispatch({ type: 'DELETE_TODO', payload: id })
  }, [])

  const editTodo = useCallback((id, newText) => {
    if (newText.trim()) {
      dispatch({ type: 'EDIT_TODO', payload: { id, text: newText.trim() } })
    }
  }, [])

  const clearCompleted = useCallback(() => {
    dispatch({ type: 'CLEAR_COMPLETED' })
  }, [])

  const value = useMemo(() => ({
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted
  }), [todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted])

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  )
}

export function useTodos() {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider')
  }
  return context
}
