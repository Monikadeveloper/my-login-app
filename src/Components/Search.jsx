import { useContext, useState } from 'react'
// import Avatar from '../assets/Avatar.jpeg'

import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../Firebase'
import { AuthContext } from './Authentication/AuthContext'

const Search = () => {
  const [userName, setUserName] = useState('')
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)
  const { currentUser } = useContext(AuthContext)
  // console.log(currentUser)

  const handleSearch = async () => {
    console.log('@@@ =========== before', userName)
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', userName)
    )
    console.log('@@@ ===========', userName)
    try {
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      })
    } catch (err) {
      setErr(true)
    }
  }

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid
    try {
      const res = await getDoc(doc(db, 'chats', combinedId))
      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), {
          messages: [],
        })

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        })

        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        })
      }
    } catch (err) {
      setErr(true)
    }
    setUser(null)
    setUserName('')
  }
  return (
    <>
      <div className="search">
        <div className="searchForm">
          <input
            className="form-control me-1"
            type="search"
            placeholder="Find a user"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            aria-label="Search"
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              margin: '3px',
              color: 'white',
            }}
          />
        </div>
        <button onClick={handleSearch}>Search</button>

        {err && <span>User not found</span>}
        {user && (
          <div className="userChat" onClick={handleSelect}>
            <img
              src={user.photoURL || ''}
              alt=""
              style={{ height: '50px', width: '50px', borderRadius: '50%' }}
            />

            <div className="userChatInfo">
              <span>{user.displayName}</span>
              <p>Hello there..</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Search
