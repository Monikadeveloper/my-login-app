


import { useContext } from 'react'
import { AuthContext } from './Authentication/AuthContext'

const Navbar = () => {
  const { currentUser } = useContext(AuthContext)
 

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
       
        </div>
      </div>
    </>
  )
}

export default Navbar
