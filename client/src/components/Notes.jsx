import { useQuery } from '@apollo/client'
import NoteCard from "./NoteCard";
import { GET_NOTES } from '../queries/notesQueries';
import Spinner from './Spinner';
import ShowNoteModal from './showNoteModal';
import { useContext, useState } from 'react';
import NotesAppLogo from '../assets/notesapp.png'
import { FaExclamationTriangle, FaPen } from 'react-icons/fa'
import Masonry from 'react-layout-masonry'
import { ThemeContext } from '../App';

export default function Notes() {

  const { loading, error, data } = useQuery(GET_NOTES)

  const [note, setNote] = useState({})
  const {theme} = useContext(ThemeContext)

  const showNote = (noteId) => {
    const selectedNote = data.notes.find(noteData => noteData.id === noteId)
    setNote(selectedNote)
    showNoteModal()
    // alert(`Showing Note ${noteId}`)
  }

  const showNoteModal = () => {
    const showNoteModalButton = document.getElementById('showNoteModalButton')
    showNoteModalButton.click()
    
  }

  let pinnedNotes = []
  let otherNotes = []
  if(!loading && !error){
    pinnedNotes = data.notes.filter(noteData => noteData.pinned)
    otherNotes = data.notes.filter(noteData => !noteData.pinned)
  }

  return (<>
    <div className="mt-4">
      {
        loading? 
          (<Spinner message="Loading..."/>)
          :
          (
            error? 
              (
                <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                  <FaExclamationTriangle size={100} className='text-warning'/>
                  <p>
                    Something went wrong 
                    <button type="button" className={`btn btn-sm ms-2 btn-${theme == 'dark'?'dark':'light'}`} onClick={() => location.reload()}>Reload</button>
                  </p>
                </div>
              ) 
              : 
              (
                <div className="mt-3">
                  {
                    data.notes.length > 0?
                      (<>
                        
                        {pinnedNotes.length > 0? 
                          (<>
                            <h4 className='mt-3'>Pinned</h4>
                            {
                              <Masonry columns={{ 575: 1, 576: 2, 1024: 3 }} gap={16}>
                                {pinnedNotes.map(noteData => (
                                  <NoteCard key={noteData.id} note={noteData} clickHandler={() => showNote(noteData.id)}/>
                                ))}
                              </Masonry>
                            }
                          </>)
                          : 
                          ''}
                        

                        <h4 className='mt-3'>{pinnedNotes.length > 0? 'Other Notes' : 'Your Notes'}</h4>
                        {
                          otherNotes.length > 0?
                            <Masonry columns={{ 575: 1, 576: 2, 1024: 3 }} gap={16}>
                              {otherNotes.map(noteData => (
                                <NoteCard key={noteData.id} note={noteData} clickHandler={() => showNote(noteData.id)}/>
                              ))}
                            </Masonry>
                          :
                            <div className="d-flex align-items-center justify-content-center text-secondary gap-2 my-2">
                              <FaPen /> Add notes
                            </div> 
                        }


                        <ShowNoteModal note={note} />
                      </>)
                      :
                      (
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <img className='mb-3' src={NotesAppLogo} alt="Logo" width="60" height="60"/>
                          <p>There are no notes yet, <strong>Start noting now</strong></p>
                        </div>
                      )
                  }
                </div>
              )
          )
      }
    </div>
  </>)
}
