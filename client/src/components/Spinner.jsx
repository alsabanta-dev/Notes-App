
export default function Spinner({ message }) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="spinner-border" role='status'></div>
      {message? (<p className="mt-2">{message}</p>) : null}
    </div>
  )
}
