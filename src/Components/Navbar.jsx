import { signOut } from 'firebase/auth'

import { auth } from '../Firebase'
import { useContext } from 'react'
import { AuthContext } from './Authentication/AuthContext'
// import { AuthContext } from '../AuthContext'
// import { useContext } from 'react'
const Navbar = () => {
  const { currentUser } = useContext(AuthContext)
  // console.log(currentUser);

  return (
    <>
      <div className="navbar">
        <span style={{ fontWeight: 'bold' }}> ChatApp </span>
        <div className="user">
          <img
            src={currentUser.photoURL}
            alt="logo"
            style={{ height: '25px', width: '25px', 'border-radius': '50%' }}
          />
          <span>{currentUser.displayName}</span>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => signOut(auth)}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  )
}

export default Navbar
