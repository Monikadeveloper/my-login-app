import { getAuth } from 'firebase/auth'

import { initializeApp } from 'firebase/app'

import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDhQHWuR6-Ejq4uiFKvs6OjBxAPHl90LEw',
  authDomain: 'login-auth-fc74d.firebaseapp.com',
  projectId: 'login-auth-fc74d',
  storageBucket: 'login-auth-fc74d.appspot.com',
  messagingSenderId: '540288986901',
  appId: '1:540288986901:web:f4c9e7938919cb8eb1831c',

}
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore()
export const storage = getStorage()
