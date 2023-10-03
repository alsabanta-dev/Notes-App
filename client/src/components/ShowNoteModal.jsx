import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa'
import { BsPinFill, BsPin } from 'react-icons/bs'
import { DELETE_NOTE, UPDATE_NOTE } from '../mutations/notesMutations'
import { useMutation } from '@apollo/client'
import { GET_NOTES } from '../queries/notesQueries'
import { createRef, useEffect } from 'react'

export default function ShowNoteModal({ note }) {

  const noteTitleRef = createRef()
  const noteContentRef = createRef()

  const [updateNote] = useMutation(UPDATE_NOTE, {
    refetchQueries: [{query: GET_NOTES}],
  })

  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: {id: note.id},
    refetchQueries: [{query: GET_NOTES}],
  })

  const onDeleteClick = () => {
    deleteNote(note.id)
  }

  const onPinClick = () => {
    updateNote({
      variables: {
        id: note.id, 
        pinned: !note.pinned
      }
    })
  }

  const onSaveClick = () => {
    const newTitle = noteTitleRef.current.value == note.title?undefined:noteTitleRef.current.value
    const newContent = noteContentRef.current.value == note.content?undefined:noteContentRef.current.value
    if(newTitle || newContent){
      updateNote({
        variables: {
          id: note.id, 
          title: newTitle, 
          content: newContent
        }
      })
    }
  }

  useEffect(() => {
    noteTitleRef.current.value = note.title,
    noteContentRef.current.value = note.content
  }, [note, noteTitleRef, noteContentRef])

  return (<>

    <button type="button" id='showNoteModalButton' style={{visibility: 'hidden'}} data-bs-toggle="modal" data-bs-target="#showNoteModal"/>

    <div className="modal fade" id="showNoteModal" tabIndex="-1" aria-labelledby="showNoteModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <input ref={noteTitleRef} className="modal-title form-control" id="showNoteModalLabel" placeholder='Note title' defaultValue={note.title}/>
            <button className='btn btn-link ms-1' data-bs-dismiss="modal" aria-label="Close"><FaTimes /></button>
          </div>
          <div className="modal-body mb-2">
            <textarea ref={noteContentRef} className="form-control" placeholder="Note content" rows={12} defaultValue={note.content}/>
          </div>
          <div className="modal-footer d-flex align-items-center justify-content-start">
            <p className='small'>Edited {(new Date(note.updatedAt*1)).toLocaleDateString('en-us', {month: 'short', day: 'numeric', year:'numeric'})}</p>
            <div className="ms-auto">
              <button type="button" className={`btn btn-link text-${note.pinned? 'primary':'secondary'}`} title={note.pinned? 'Unpin':'Pin'} data-bs-dismiss="modal" onClick={onPinClick}>
                {note.pinned?<BsPinFill />:<BsPin />}
              </button>
              <button type="button" className="btn btn-link text-danger" title="Delete" data-bs-dismiss="modal" onClick={onDeleteClick}>
                <FaTrash  />
              </button>
              <button type="button" className="btn btn-link text-success" title="Save" data-bs-dismiss="modal" onClick={onSaveClick}>
                <FaCheck  />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}
