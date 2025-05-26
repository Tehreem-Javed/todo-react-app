import React from 'react'

const TaskItem = ({ task, onComplete, onDelete, onEdit }) => {
  return (
    <li className={`p-3 rounded-md ${task.completed ? 'bg-gray-300 line-through text-gray-600' : 'bg-gray-100'} dark:bg-gray-700`}>
      <div>
        <p className="font-medium">{task.name}</p>
        <p className="text-sm">Due: {task.dueDate || 'No Deadline'}</p>
        <p className="text-sm">Category: {task.category}</p>
      </div>
      <div className="flex gap-2 mt-2">
        <button onClick={onComplete} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">✔</button>
        <button onClick={onEdit} className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded">✏</button>
        <button onClick={onDelete} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">❌</button>
      </div>
    </li>
  )
}

export default TaskItem
