import { useContext } from 'react'
import NotesAppLogo from '../assets/notesapp.png'
import ToggleThemeButton from './ToggleThemeButton'
import { ThemeContext } from '../App'

export default function Header() {

  const {theme} = useContext(ThemeContext)

  return (<>
    <nav className={`navbar navbar-${theme} bottom-border`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img className='me-3' src={NotesAppLogo} alt="" width="30" height="30"/>
          <span>Notes App</span>
        </a>
        <div className="d-flex align-items-center gap-4 me-4">
          <ToggleThemeButton />
        </div>
      </div>
    </nav>
  </>)
}
