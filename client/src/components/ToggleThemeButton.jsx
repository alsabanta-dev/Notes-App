import { FaMoon, FaSun } from 'react-icons/fa'
import { ThemeContext } from '../App'
import { useContext } from 'react'

export default function ToggleThemeButton() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  
  return (
    <button className='btn btn-link' onClick={toggleTheme}>
      {theme == 'dark'? <FaSun/> : <FaMoon />}
    </button>
  )
}
