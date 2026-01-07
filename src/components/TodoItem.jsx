import { useState } from 'react'
import { useTodos } from '../contexts/TodoContext'

function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const { toggleTodo, deleteTodo, editTodo } = useTodos()

  const handleToggle = () => {
    toggleTodo(todo.id)
  }

  const handleDelete = () => {
    deleteTodo(todo.id)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditText(todo.text)
  }

  const handleSave = () => {
    if (editText.trim()) {
      editTodo(todo.id, editText)
      setIsEditing(false)
    } else {
      setEditText(todo.text)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="todo-checkbox"
        />
        
        {isEditing ? (
          <div className="todo-edit">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleSave}
              className="todo-edit-input"
              autoFocus
            />
          </div>
        ) : (
          <span 
            className="todo-text"
            onDoubleClick={handleEdit}
            title="Double-click to edit"
          >
            {todo.text}
          </span>
        )}
      </div>
      
      <div className="todo-actions">
        {!isEditing && (
          <>
            <button
              onClick={handleEdit}
              className="edit-button"
              title="Edit todo"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="delete-button"
              title="Delete todo"
            >
              Delete
            </button>
          </>
        )}
        
        {isEditing && (
          <>
            <button
              onClick={handleSave}
              className="save-button"
              title="Save changes"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="cancel-button"
              title="Cancel editing"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </li>
  )
}

export default TodoItem
