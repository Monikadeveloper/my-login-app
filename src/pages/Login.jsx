import { useState } from 'react'
import { auth } from '../Firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [err, setErr] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      localStorage.setItem('uid', auth.currentUser.uid)
      alert('found')
      navigate('/home')
    } catch (err) {
      setErr(true)
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </form>
      {err && <span>Something went wrong</span>}
      <p>
        You dont have any account?<Link to="/signup">Register</Link>
      </p>
    </>
  )
}

export default Login
