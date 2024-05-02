// import { useContext, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { IoMdAttach } from 'react-icons/io'
import { useContext, useState } from 'react'
import { AuthContext } from './Authentication/AuthContext'
// import Avatar from '../assets/Avatar.jpeg'
import { ChatContext } from './Authentication/ChatContext'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../Firebase'
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'

const Input = () => {
  const [text, setText] = useState('')
  const [img, setImg] = useState(null)

  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)
  // console.log(currentUser)
  // console.log(data)

  const handleSend = async () => {
    // e.preventDefault()
    if (img) {
      const storageRef = ref(storage, uuid())

      const uploadTask = uploadBytesResumable(storageRef, img)

      uploadTask.on(
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, 'chats', data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            })
          })
        }
      )
    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      })
    }
    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    })
    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    })
    setText('')
    setImg(null)
  }

  return (
    <>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Text input with segmented dropdown button"
          placeholder="Type something here...."
        />
        <div className="send">
          <img src={IoMdAttach} alt="" />
          <input
            type="file"
            style={{ display: 'none' }}
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="file">
            <img src={img} alt="" />
          </label>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </>
  )
}

export default Input
