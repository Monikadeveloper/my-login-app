import img from './cute girl-191.jpeg'
import '../pages/style.scss'

const Message = () => {
  return (
    <div className="message">
      <div className="messageInfo">
        <img
          src={img}
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

      <p className='p'>Hello</p>
    </div> 
  )
}

export default Message
