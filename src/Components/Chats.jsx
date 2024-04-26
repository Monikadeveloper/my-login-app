import img from './cute girl-191.jpeg'
const Chats = () => {
  return (
    <div className="chats">
      <div className="userChat">
        <img
          src={img}
          alt=""
          style={{ height: '50px', width: '50px', borderRadius: '50%' }}
        />

        <div className="userChatInfo">
          <span>Monika</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  )
}

export default Chats
