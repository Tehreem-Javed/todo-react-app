import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload)
    },
    toggleComplete: (state, action) => {
      const task = state.tasks[action.payload]
      task.completed = !task.completed
    },
    deleteTask: (state, action) => {
      state.tasks.splice(action.payload, 1)
    },
    editTask: (state, action) => {
      const { index, newName } = action.payload
      state.tasks[index].name = newName
    },
  },
})

export const { addTask, toggleComplete, deleteTask, editTask } = tasksSlice.actions
export default tasksSlice.reducer
