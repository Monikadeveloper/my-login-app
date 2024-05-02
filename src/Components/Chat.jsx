import { FaVideo } from 'react-icons/fa'
import { IoIosContact } from 'react-icons/io'
import { FaList } from 'react-icons/fa6'
import Messages from './Messages'
import Input from './Input'
import { useContext } from 'react'
import { ChatContext } from './Authentication/ChatContext'

const Chat = () => {
  const { data } = useContext(ChatContext)
  
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <p>
            <FaVideo />
          </p>

          <p>
            <IoIosContact />
          </p>
          <p>
            <FaList />
          </p>
        </div>
      </div>
      
      <Messages />
      <Input />
    </div>
  )
}

export default Chat
