/* eslint-disable no-unused-vars */

import { useState } from 'react'
import { ref, set } from 'firebase/database'
import { auth, provider, db } from '../Firebase'
import {
  GoogleAuthProvider,
  signInWithRedirect,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSignup = () => {
    set(ref(db, 'users' + name), {
      id: new Date().getMilliseconds(),
      username: name,
      email: email,
      password: password,
    })
    createUserWithEmailAndPassword(auth, name, email, password).then((value) =>
      console.log(value)
    )
    navigate('/login')
  }

  function googleSignup() {
    signInWithRedirect(auth, provider)
      .then((result) => {
        console.log('🚀 ~ .then ~ result:', result)

        const credential = GoogleAuthProvider.credentialFromResult(result)
        console.log('🚀 ~ .then ~ credential:', credential)
        const token = credential.accessToken
        console.log('🚀 ~ .then ~ token:', token)

        const user = result.user
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message

        const email = error.customData.email

        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
      })
  }
  return (
    <>
      <h1>Sign up</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          placeholder="Enter your username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
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
      <button type="button" className="btn btn-primary" onClick={handleSignup}>
        Sign up
      </button>
      <p>Or</p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => googleSignup()}
      >
        Sign up with google
      </button>
    </>
  )
}

export default Signup
