import { useEffect, useState } from 'react'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  const [tasks, setTasks] = useState([])
  const [isRegistering, setIsRegistering] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (token) => {
    localStorage.setItem('token', token)
    setIsLoggedIn(true)
  }

  const handleAddTask = (newTask) => {
    setTasks(prevTask => [...prevTask, newTask])
  }

  const handleToggleComplete = (taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? {...task, completed: !task.completed} : task
      )
    )
  }

  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))

    fetch(`https://task-api-fawn.vercel.app/api/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .catch(error => console.error('Network error', error))
  }

  const handleRegister = () => {
    setIsRegistering(true)
  }

  const handleBackToLogin = () => {
    setIsRegistering(false)
  }

  useEffect(() => {
    if(isLoggedIn) {
      fetch('https://task-api-fawn.vercel.app/api/tasks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error))
    }
  }, [isLoggedIn])

  return (
    <main>
      <h1>task-api</h1>
      {isLoggedIn ? (
        <>
          <div className='logged-container'>
            <TaskInput onTaskAdd={handleAddTask}/>
            <TaskList tasks={tasks} onToggleCompleted={handleToggleComplete} onDeleteTask={handleDeleteTask}/>
          </div>
        </>
      ) : (
        isRegistering ? (
        <Register onRegister={handleBackToLogin}/>
      ) : ( 
        <Login onLogin={handleLogin} onRegister={handleRegister} />
        )
      )}
    </main>
  )
}

export default App