import { useState } from "react";
import '../TaskInput.css'

function TaskInput({onTaskAdd}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')

  const handleAddTask = () => {
    if(title.trim() === '' || description.trim() === '') return

    const token = localStorage.getItem('token')

    fetch('https://task-api-fawn.vercel.app/api/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({title, description})
    })
      .then(response => response.json())
      .then(newTask => {
        onTaskAdd(newTask)
        setTitle('')
        setDescription('')
      })
      .catch(error => console.error(error))

  }
  return (
    <div className="task-input">
      <input
      className="input"
      type="text" 
      value={title} 
      onChange={(e) => setTitle(e.target.value)} 
      placeholder="Title" 
      />
      <textarea
      className="textarea"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Description"
      />
      <div className="button-container">
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  )
}

export default TaskInput