// import { useContext, useEffect, useState } from 'react'
import Message from './Message'
// import { ChatContext } from '../ChatContext'
// import { doc, onSnapshot } from 'firebase/firestore'
// import { db } from '../Firebase'

const Messages = () => {
  // const { data } = useContext(ChatContext)
  // const [message, setMessage] = useState([])

  // useEffect(() => {
  //   const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
  //     doc.exists() && setMessage(doc.data().message)
  //   })
  //   return unsub()
  // }, [data.chatId])

  return (
    <>
      <div className="messages">
        {/* {message.map((m) => (
          <Message message={m} key={m.id} />
        ))} */}

        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
    </>
  )
}

export default Messages
