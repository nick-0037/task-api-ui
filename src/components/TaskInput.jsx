import { useState } from "react";
import '../TaskInput.css'

function TaskInput({onTaskAdd}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')

  const handleAddTask = () => {
    if(title.trim() === '' || description.trim() === '') return

    onTaskAdd({title, description})
    setTitle('')
    setDescription('')
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
        <button onClick={handleAddTask}>Save Task</button>
      </div>
    </div>    
  )
}

export default TaskInput