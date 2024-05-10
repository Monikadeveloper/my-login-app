
import Messages from './Messages'
import Input from './Input'
import { useContext } from 'react'
import { ChatContext } from './Authentication/ChatContext'
import { signOut } from 'firebase/auth'
import { auth } from '../Firebase'

const Chat = () => {
  const { data } = useContext(ChatContext)
  
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
        
          <button
            type="button"
            className="btn btn-light"
            style={{margin:"5%"}}
            onClick={() => signOut(auth)}
          >
            Logout
          </button>
        </div>
      </div>
      
      <Messages />
      <Input />
    </div>
  )
}

export default Chat
