import { useState } from 'react'
import { useTodos } from '../contexts/TodoContext'

function TodoInput() {
  const [inputValue, setInputValue] = useState('')
  const { addTodo } = useTodos()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      addTodo(inputValue)
      setInputValue('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="todo-input-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="What needs to be done?"
        className="todo-input"
        autoFocus
      />
      <button type="submit" className="add-button">
        Add Todo
      </button>
    </form>
  )
}

export default TodoInput
