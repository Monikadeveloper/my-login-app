import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './Authentication/AuthContext'

import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../Firebase'
import { ChatContext } from './Authentication/ChatContext'

const Chats = () => {
  const [chats, setChats] = useState([])
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(doc.data())
      })
      return () => {
        unsub()
      }
    }
    currentUser.uid && getChats()
  }, [currentUser.uid])

  const handleSubmit = (u) => {
    dispatch({
      type: 'CHANGE_USER',
      payload: u,
    })
  }

  return (
    <>
      <div className="chats">
        {Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              className="userChat"
              key={chat[0]}
              onClick={() => handleSubmit(chat[1].userInfo)}
            >
              <img
                src={chat[1].userInfo.photoURL}
                alt=""
                style={{ height: '50px', width: '50px', borderRadius: '50%' }}
              />

              <div className="userChatInfo">
                <span>{chat[1].userInfo.displayName}</span>

                <p>
                  {chat[1].lastMessage?.text.length > 14
                    ? `${chat[1].lastMessage.text.slice(0, 13)}...`
                    : chat[1].lastMessage?.text}
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}
export default Chats
