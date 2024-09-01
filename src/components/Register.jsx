import { useState } from "react";
import '../Register.css'

function Register({onRegister, onLogin}) {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = (e) => {
    e.preventDefault()

    fetch('https://task-api-fawn.vercel.app/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, username, password})
    })
    .then(response => response.json())
    .then(onRegister())
    .catch(error => console.error('Fail register error', error))
  }

  return (
    <div>
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <div>
          <input type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          />
        </div>
        <div>
          <input type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          />
        </div>
        <div>
          <input type="text" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          />
        </div>
        <div className="bts-register">
          <button type="submit">Register</button>
          <button onClick={onLogin}>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Register