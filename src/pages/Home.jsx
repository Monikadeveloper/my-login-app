import Chat from '../Components/Chat'
import Sidebar from '../Components/Sidebar'
import './style.scss'

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="container" >
          <Sidebar />
          <Chat />
        </div>
      </div>
    </>
  )
}

export default Home
