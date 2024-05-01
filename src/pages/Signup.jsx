/* eslint-disable no-unused-vars */

import { useState } from 'react'

import { doc, setDoc } from 'firebase/firestore'
import { auth, db, storage } from '../Firebase'
import { ref } from 'firebase/storage'
import {
  GoogleAuthProvider,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from '../assets/Avatar.jpeg'
import { uploadBytesResumable, getDownloadURL } from 'firebase/storage'

function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [file, setFile] = useState()
  const [err, setErr] = useState(false)

  const handleSubmit = async () => {
    // e.preventDefault()
    alert('clicked')
    const displayName = name
    // const email = email
    // const password = password
    try {
      console.log(auth, email, password)
      const res = await createUserWithEmailAndPassword(auth, email, password)
      const storageRef = ref(storage, displayName)

      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        (error) => {
          setErr(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            })
            setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            }),
              setDoc(doc(db, 'userChats', res.user.uid), {})
            navigate('/login')
          })
        }
      )
    } catch (err) {
      setErr(true)
    }
  }

  return (
    <>
      <h1>Sign up</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter your username"
          aria-label="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Enter your mail id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="Password"
          className="form-control"
          placeholder="Enter your password"
          aria-label="Username"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-describedby="basic-addon1"
        />
      </div>
      <input
        style={{ display: 'none' }}
        type="file"
        id="file"
        value={file}
        onChange={(e) => setFile(e.target.files)}
      />
      <label htmlFor="file">
        <img src={Avatar} alt="" />
        <span>Add an avatar</span>
      </label>
      <button type="button" className="btn btn-primary" onClick={handleSubmit}>
        Sign up
      </button>
      {err && <span>Something went wrong</span>}

      <p>
        Already have an account <Link to="/login">Login</Link>
      </p>
    </>
  )
}

export default Signup
