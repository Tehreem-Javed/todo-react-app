import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTask, toggleComplete, deleteTask, editTask } from './features/tasks/tasksSlice'
import TaskItem from './components/TaskItem'

const App = () => {
  const tasks = useSelector((state) => state.tasks.tasks)
  const dispatch = useDispatch()

  const [taskInput, setTaskInput] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('Personal')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleAddTask = () => {
    if (taskInput.trim() === '') return
    const newTask = {
      name: taskInput,
      dueDate,
      category,
      completed: false,
    }
    dispatch(addTask(newTask))
    setTaskInput('')
    setDueDate('')
    setCategory('Personal')
  }

  const handleEditTask = (index) => {
    const newName = prompt("Edit your task:", tasks[index].name)
    if (newName !== null) {
      dispatch(editTask({ index, newName: newName.trim() }))
    }
  }

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen flex items-center justify-center`}>
      <div className="container mx-auto max-w-lg bg-white shadow-md rounded-lg p-6 w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">To-Do List</h2>

        <div className="flex flex-col gap-2 mb-4">
          <textarea
            className="p-2 border rounded resize-none h-24 text-black"
            placeholder="Enter your task..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <input
            type="date"
            className="p-2 border rounded text-black"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <select
            className="p-2 border rounded text-black pr-10"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
          </select>
          <button onClick={handleAddTask} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
            Add Task
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              onComplete={() => dispatch(toggleComplete(index))}
              onDelete={() => dispatch(deleteTask(index))}
              onEdit={() => handleEditTask(index)}
            />
          ))}
        </ul>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mt-4 ml-42 text-sm text-white bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
        >
          {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </div>
  )
}

export default App
