import { useState } from "react";
import loginService from '../services/Login'
import '../Login.css'

function Login({onLogin, onRegister}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(username.trim() === '' || password.trim() === '') {
      setError('Username and password are required')
      return
    }
      
    try {
      const user = await loginService.login({
        username,
        password
      })
  
      if(user) {
        window.localStorage.setItem('token', user.token)
        window.localStorage.setItem('user', JSON.stringify(user))

        onLogin()
      }
    } catch(err) {
      console.error('Error during login', err)
      setError('Invalid credentials')
    }
    setUsername('')
    setPassword('')
  }

  return (
    <> 
      <h2>Login</h2>
      <form className='login' onSubmit={handleSubmit}>
        <input type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        />
        <input type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        />
        <div className="bts-login">
          <button type="submit">Login</button>
          <button onClick={onRegister}>Register</button>
        </div>
      </form>
    </>
  )
}

export default Login