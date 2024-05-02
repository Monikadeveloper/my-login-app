import '../pages/style.scss'

import PropTypes from 'prop-types'

import { useContext, useEffect, useRef } from 'react'
import { AuthContext } from './Authentication/AuthContext'
import { ChatContext } from './Authentication/ChatContext'

function Message({ message }) {
  Message.propTypes = {
    message: PropTypes.any,
  }
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)
  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({ behaviour: 'smooth' })
  }, [message])
  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && 'owner'}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="dp"
          style={{
            height: '8vh',
            width: '4vw',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
        <span>Just now</span>
      </div>
      <div className="messageContent">
        <p className="p">{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}

export default Message
