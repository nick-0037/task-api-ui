import { useEffect, useState } from 'react'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import Login from './components/Login'
import Register from './components/Register'
// import loginService from './services/Login'
import { createTask, deleteTask, setToken, getAllTasks } from './services/Tasks'

function App() {
  const [tasks, setTasks] = useState([])
  const [isRegistering, setIsRegistering] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    const tokenFromLocalStorage = window.localStorage.getItem('token')

    if(tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage)
    }

    if (loggedUserJSON) {
      // const user = JSON.parse(loggedUserJSON)
      // setUser(user)
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }
  
  const handleLogout = () => {
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('token')

    setIsLoggedIn(false)
  }

  const handleAddTask = async (newTask) => {
    try {
      const addedTask = await createTask(newTask)
      setTasks([...tasks, addedTask])
    } catch(err) {
      console.error('Error creating task', err)
    }
  }

  const handleToggleComplete = (taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? {...task, completed: !task.completed} : task
      )
    )
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId)
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
    } catch (err) {
      console.error('Error deleting', err)
    }
  }

  const handleRegister = () => {
    setIsRegistering(true)
  }

  const handleBackToLogin = () => {
    setIsRegistering(false)
  }


  useEffect(() => {
    const fetchTasks = async () => {
      if(isLoggedIn) {
        try {
          const tasks = await getAllTasks()
          setTasks(tasks)
        } catch(err) {
          console.error('Error fetching tasks', err)
        }
      }
    }

    fetchTasks()
  }, [isLoggedIn])

  return (
    <main>
      <h1>task-api</h1>
      { isLoggedIn ? (
        <>
          <div className='logged-container'>
            <button onClick={handleLogout}>Logout</button>
            <TaskInput onTaskAdd={handleAddTask}/>
            <TaskList tasks={tasks} onToggleCompleted={handleToggleComplete} onDeleteTask={handleDeleteTask}/>
          </div>
        </>
      ) : (
        isRegistering ? (
        <Register onLogin={handleBackToLogin}/>
      ) : ( 
        <Login onLogin={handleLogin} onRegister={handleRegister} />
        )
      )}
    </main>
  )
}

export default App