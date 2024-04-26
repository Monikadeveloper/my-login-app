import img from './cute girl-191.jpeg'

const Search = () => {
  return (
    <>
      <form className="d-flex">
        <input
          className="form-control me-1"
          type="search"
          placeholder="Find a user"
          aria-label="Search"
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            margin: '3px',
            color: 'white',
          }}
        />
      </form>
      <div className="userChat">
        <img
          src={img}
          alt=""
          style={{ height: '50px', width: '50px', borderRadius: '50%' }}
        />

        <div className="userChatInfo">
          <span>Monika</span>
          <p>Hello there..</p>
        </div>
      </div>
    </>
  )
}

export default Search
