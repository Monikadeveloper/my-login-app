import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import './App.css'
import Home from './pages/Home'
import { AuthContext } from './Components/Authentication/AuthContext'
import { useContext } from 'react'

const App = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={currentUser ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
