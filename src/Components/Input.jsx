const Input = () => {
  return (
    <>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          aria-label="Text input with segmented dropdown button"
          placeholder="Type something here...."
        />
        <button type="button" className="btn btn-primary">
          Send
        </button>
      </div>
    </>
  )
}

export default Input
