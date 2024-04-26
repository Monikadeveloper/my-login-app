import img from './cute girl-191.jpeg'
const Navbar = () => {
  return (
    <>
      <div className="navbar">
      <span style={{ fontWeight: 'bold' }}> ChatApp </span>
        <div className="user">
        
          <img
            src={img}
            alt="logo"
            style={{ height: '25px', width: '25px', 'border-radius': '50%' }}
          />
          <span>Monika</span>
          <button type="button" className="btn btn-light">
            Logout
          </button>
        </div>
      </div>
    </>
  )
}

export default Navbar
