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
            // message.senderId === currentUser.uid
            //   ? currentUser.photoURL
              data.user.photoURL
          }
          alt="dp"
          style={{
            height: '8vh',
            width: '4vw',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      </div>
      <div className="messageContent">
        {/* <p className="p">{currentUser.data.message.text}</p> */}
        {/* <p className="p">{currentUser.message}</p> */}
        {/* <p className="p">{data.user.message.text}</p> */}
        {/* {message.img && <img src={message.img} alt="" />} */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p className="p2">{message.text}</p>

          <img
            src={
              // message.senderId === currentUser.uid
                 currentUser.photoURL
              // data.user.photoURL
            }
            alt="dp"
            style={{
              height: '8vh',
              width: '4vw',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        </div>
        <p style={{ marginLeft: '300px' }}> Just now</p>
      </div>
    </div>
  )
}

export default Message
