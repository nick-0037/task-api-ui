import '../TaskList.css'

function TaskList({tasks, onToggleCompleted, onDeleteTask}) {

  const displayedTasks = tasks.slice(-8)

  return (
    <ul className="list">
      <div className='container-category'>
        <h3>Title</h3>
        <h3>Description</h3>
        <h3>Completed</h3>
      </div>
      {displayedTasks.map(task => (
        <li key={task.id} className={task.completed ? 'completed' : ''}>
          <span>{task.title}</span>
          <span>{task.description}</span>
          <div className='complete-container'>
            <input type="checkbox" checked={task.completed} onChange={() => onToggleCompleted(task.id)} />
            <button onClick={() => onDeleteTask(task.id)}>Delete</button>
          </div>
        </li>
        
      ))}
    </ul>
  )
}

export default TaskList