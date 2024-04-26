import { getAuth } from 'firebase/auth'

import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyDhQHWuR6-Ejq4uiFKvs6OjBxAPHl90LEw',
  authDomain: 'login-auth-fc74d.firebaseapp.com',
  projectId: 'login-auth-fc74d',
  storageBucket: 'login-auth-fc74d.appspot.com',
  messagingSenderId: '540288986901',
  appId: '1:540288986901:web:f4c9e7938919cb8eb1831c',
  measurementId: 'G-GW505SQPJ8',
  databaseURL: 'https://login-auth-fc74d-default-rtdb.firebaseio.com/',
}
const app = initializeApp(firebaseConfig)
export const provider = new GoogleAuthProvider()

export const auth = getAuth(app)
export const db = getDatabase(app)


