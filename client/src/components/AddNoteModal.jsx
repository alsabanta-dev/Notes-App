import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { FaPen, FaTimes } from 'react-icons/fa'
import { CREATE_NOTE } from '../mutations/notesMutations'
import { GET_NOTES } from '../queries/notesQueries'
export default function AddNoteModal() {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [createNote] = useMutation(CREATE_NOTE, {
    variables: {title, content},
    refetchQueries: [{query: GET_NOTES}]
  })

  const onSubmit = () => {
    if(!title || !content){
      return alert('Please fill in all fields')
    }

    createNote(title, content)
    setTitle('')
    setContent('')
    document.getElementById('closeButton').click()
  }

  return (<>
    <div className="input-group">
      <span className="input-group-text text-primary"><FaPen /></span>
      <input type="text" readOnly placeholder='Take a note...' className="form-control" data-bs-toggle="modal" data-bs-target="#addNoteModal"/>
    </div>

    <div className="modal fade" id="addNoteModal" tabIndex="-1" aria-labelledby="addNoteModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addNoteModalLabel">New Note</h5>
            <button className='btn btn-link ms-1' data-bs-dismiss="modal" aria-label="Close"><FaTimes /></button>
          </div>
          <div className="modal-body">
            <input className="form-control mb-2" placeholder="Note title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <textarea className="form-control" placeholder="Type note here..." rows={10} value={content} onChange={(e) => setContent(e.target.value)}/>
          </div>
          <div className="modal-footer">
            <button id="closeButton" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={onSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  </>)
}
