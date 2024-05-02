/* eslint-disable no-unused-vars */

import { useState } from 'react'
import Add2 from '../assets/Add2.jpeg'

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
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [file, setFile] = useState()
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    // e.preventDefault()
    alert('clicked')
    const displayName = name

    // const email = email
    // const password = password
    try {
      console.log(auth, email, password)
      const res = await createUserWithEmailAndPassword(auth, email, password)
      const date = new Date().getTime()
      const storageRef = ref(storage, `${displayName + date}`)

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            })
            //create user on firestore
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            })

            //create empty user chats on firestore
            await setDoc(doc(db, 'userChats', res.user.uid), {})
            navigate('/login')
          } catch (err) {
            console.log(err)
            setErr(true)
            setLoading(false)
          }
        })
      })
    } catch (err) {
      setErr(true)
      setLoading(false)
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
        // value={file}
        // onChange={(e) => setFile(e.target.files[0])}
      />
      <label htmlFor="file">
        <img src={Add2} alt="" style={{ height: '50px' }} />
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
