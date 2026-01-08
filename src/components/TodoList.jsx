import { useMemo } from 'react'
import { useTodos } from '../contexts/TodoContext'
import { useFilter, FILTER_TYPES } from '../contexts/FilterContext'
import TodoItem from './TodoItem'

function TodoList() {
  const { todos, clearCompleted } = useTodos()
  const { filter } = useFilter()

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case FILTER_TYPES.ACTIVE:
        return todos.filter(todo => !todo.completed)
      case FILTER_TYPES.COMPLETED:
        return todos.filter(todo => todo.completed)
      default:
        return todos
    }
  }, [todos, filter])

  const completedCount = useMemo(() => {
    return todos.filter(todo => todo.completed).length
  }, [todos])

  const activeCount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length
  }, [todos])

  if (todos.length === 0) {
    return (
      <div className="todo-list-empty">
        <p>No todos yet. Add one above!</p>
      </div>
    )
  }

  return (
    <div className="todo-list-container">
      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      
      {filteredTodos.length === 0 && todos.length > 0 && (
        <div className="no-todos-message">
          <p>No todos match the current filter.</p>
        </div>
      )}
      
      <div className="todo-footer">
        <span className="todo-count">
          {activeCount} {activeCount === 1 ? 'item' : 'items'} left
        </span>
        
        {completedCount > 0 && (
          <button 
            onClick={clearCompleted}
            className="clear-completed-button"
          >
            Clear completed ({completedCount})
          </button>
        )}
      </div>
    </div>
  )
}

export default TodoList
