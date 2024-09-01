import { useState } from "react";
import '../Login.css'

function Login({onLogin, onRegister}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch('https://task-api-fawn.vercel.app/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password})
    })
    .then(response => response.json())
    .then(data => {
      if(data.token) {
        onLogin(data.token)
      }
    })
    .catch(error => console.error('Error during login:', error))
  }

  return (
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
  )
}

export default Login