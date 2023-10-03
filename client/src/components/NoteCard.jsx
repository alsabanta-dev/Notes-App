import { FaChevronRight } from "react-icons/fa"

export default function NoteCard({ note, clickHandler }) {

  return (<>
      <div type="button" className='card'  onClick={clickHandler}>
        <div className="card-header py-1 ps-3">
          <div className="d-flex align-items-center">
            <div className="card-title m-0 fw-bold small text-color">{note.title}</div>
            <FaChevronRight size='0.8rem' className="text-primary ms-auto" title="Show"/>
          </div>
        </div>
        <div className="card-content px-3 pt-2">
          <pre className="small text-color">{note.content}</pre>
        </div>
      </div>
  </>)
}
