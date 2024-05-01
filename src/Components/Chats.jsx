// import { useContext } from 'react'
// import Avatar from '../assets/Avatar.jpeg'

// import { doc, onSnapshot } from 'firebase/firestore'
// import { db } from '../Firebase'
// import { AuthContext } from '../AuthContext'
// import { ChatContext } from '../ChatContext'
const Chats = () => {
  // const [chats, setChats] = useState([])
  // const { currenUser } = useContext(AuthContext)
  // const { dispatch } = useContext(ChatContext)
  // console.log('-------->chat screen',currenUser, dispatch)

  // useEffect(() => {
  //   const getChats = () => {
  //     const unsub = onSnapshot(doc(db, 'userChats', 'SF'), (doc) => {
  //       setChats(doc.data())
  //     })
  //     return () => {
  //       unsub()
  //     }
  //   }
  //   currenUser.uid && getChats()
  // }, [currenUser.uid])
  // console.log(chats)

  // const handleSubmit = (u) => {
  //   dispatch({
  //     type: 'CHANGE_USER',
  //     payload: u,
  //   })
  // }

  return (
    <div className="chats">
      <div className="userChat">
        
      </div>
    </div>
  )
}

export default Chats

{
  /* // <div className="chats"> */
}
//   {/* {Object.entries(chats)
//     ?.sort((a, b) => b[1].date - a[1].date)
//     .map((chat) => ( */}
//   <div
//     className="userChat"
//     // key={chat[0]}
//     // onClick={handleSubmit(chat[1].userInfo)}
//   >
//     {/* <img
//       src=""
//       // src={chat[1].userInfo.photoURL}
//       alt=""
//       style={{ height: '50px', width: '50px', borderRadius: '50%' }}
//     /> */}

//     <div className="userChatInfo">
//       {/* <span>{chat[1].userInfo.displayName}</span>
//           <p>{chat[1].lastMessage?.text}</p> */}
//     </div>
//   </div>
//   {/* ))} */}
// </div>
