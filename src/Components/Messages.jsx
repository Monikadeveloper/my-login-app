import { useContext, useEffect, useState } from 'react'
import { ChatContext } from './Authentication/ChatContext'
import Message from './Message'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../Firebase'

const Messages = () => {
  const [messages, setMessages] = useState([])
  
  const { data } = useContext(ChatContext)
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })
    return ()=>{unsub()}
  }, [data.chatId])
 

  return (
    <>
      <div className="messages">
        {messages.map((m) => (
          <Message message={m} key={m.id} />
        ))}
      </div>
    </>
  )
}

export default Messages
