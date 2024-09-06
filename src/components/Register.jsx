import { useState } from "react";
import '../Register.css'
import registerServices from '../services/Register'

function Register({onRegister, onLogin}) {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      if(!name || !username || !password) return 

      const newUser = await registerServices.createUser({name, username, password})
      onRegister(newUser)
    } catch(err) {
      console.error('Registration failed', err)
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <div>
          <input type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          />
        </div>
        <div>
          <input type="text"
          name="username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          />
        </div>
        <div>
          <input type="password" 
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          />
        </div>
        <div className="bts-register">
          <button type="submit">Register</button>
          <button type="button" onClick={onLogin}>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Register