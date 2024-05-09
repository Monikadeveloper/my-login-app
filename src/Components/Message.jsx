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
  const currentUserId = localStorage.getItem('uid')
  console.log('🚀 ~ Message ~ currentUserId:', currentUserId)

  useEffect(() => {
    ref.current?.scrollIntoView({ behaviour: 'smooth' })
  }, [message])

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && 'owner'}`}
    >
      <div className="messageInfo messageContent">
      {/* <img
        src={data.user.photoURL}
        alt="dp"
        style={{
          height: '8vh',
          width: '4vw',
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      /> */}
      <div className="messageContent">
        {currentUserId !== message.senderId && (
          <div
            className="sender"
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              margin: '0%',
            }}
          >
            <img
              src={data.user.photoURL}
              alt="dp"
              style={{
                height: '8vh',
                width: '4vw',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
            <p className="p">{message.text}</p>
          </div>
          
        )}
        {currentUserId == message.senderId && (
          <div
            style={{
            display:'flex',
            marginRight:"5vw"
            }}
          >
            <p className="p2">{message.text}</p>
            <img
              src={currentUser.photoURL}
              alt="dp"
              style={{
                height: '8vh',
                width: '4vw',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          </div>
        )}
        {/* <p style={{ marginLeft: '300px' }}> Just now</p> */}
      </div>
      </div>
    </div>
  )
}

export default Message
