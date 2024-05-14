
import { v4 as uuid } from 'uuid'

import { useContext, useState } from 'react'
import { AuthContext } from './Authentication/AuthContext'
import emoji from '../assets/emoji.avif'

import { ChatContext } from './Authentication/ChatContext'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../Firebase'
import EmojiPicker from 'emoji-picker-react'

import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'

const Input = () => {
  const [text, setText] = useState('')
  const [img, setImg] = useState()
  const [open, setOpen] = useState(false)

  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  
  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji)
    setOpen(false)
  }

  const handleSend = async () => {
   
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
      <div className="input">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Type Something here........."
            aria-label="Recipient's username with two button addons"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        

          <div
            className="send"
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
          
            <div className="emoji">
              <img
                src={emoji}
                style={{ height: '5vh', cursor: 'pointer' }}
                alt=""
                onClick={() => setOpen((prev) => !prev)}
              />
              <div className="picker">
                <EmojiPicker open={open} onEmojiClick={handleEmoji} />
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Input
