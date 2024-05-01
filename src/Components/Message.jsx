import '../pages/style.scss'
// import { useContext } from 'react'
// import { AuthContext } from '../AuthContext'
// import { ChatContext } from '../ChatContext'
// import PropTypes from 'prop-types'
import Avatar from '../assets/Avatar.jpeg'

function Message() {
  // Message.propTypes = {
  //   message: PropTypes.any,
  // }
  // const { currentUser } = useContext(AuthContext)
  // const { data } = useContext(ChatContext)
  // const ref = useRef()
  // console.log(message)
  // useEffect(() => {
  //   ref.current?.scrollIntoView({ behaviour: 'smooth' })
  // }, [message])
  return (
    <div className="owner">
      {/* // className={`message ${message.senderId === currentUser.uid && 'owner'}`} */}

      <div className="messageInfo">
        <img
          src={Avatar}
          // src={
          //   message.senderId === currentUser.uid
          //     ? currentUser?.photoURL
          //     : data?.user?.photoURL
          // }
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
      <div className="messageContent"></div>
      <p className="p">Hello there....</p>
      {/* <p className="p">{message.text}</p>
      {message.img && <img src={message.img} alt="" />} */}
    </div>
  )
}

export default Message
