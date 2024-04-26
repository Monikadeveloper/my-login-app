import { useState } from 'react'
import { auth } from '../Firebase'

import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    console.log(email, password)
    signInWithEmailAndPassword(auth, email, password)
      .then((value) => alert('Login success', value))
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.Message
        console.log(errorCode, errorMessage)
      })
  }

  return (
    <>
      <h1>Login</h1>

      <div className="input-group mb-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          placeholder="Enter your mail id"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Enter your password"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <button type="button" className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </>
  )
}

export default Login
