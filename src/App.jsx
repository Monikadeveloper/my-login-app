import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import './App.css'
import Home from './pages/Home'
import { AuthContext } from './Components/Authentication/AuthContext'
import { useContext } from 'react'
// import { AuthContext } from './Components/Authentication/AuthContext'

// import PropTypes from 'prop-types'

const App = () => {
  const { currentUser } = useContext(AuthContext)

  // console.log('currentUser', currentUser)

  // const ProtectedRoute = ({ children }) => {
  //   ProtectedRoute.propTypes = {
  //     children: PropTypes.any,
  //   }
  //   if (currentUser === undefined) {
  //     return children
  //   }
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={currentUser ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
