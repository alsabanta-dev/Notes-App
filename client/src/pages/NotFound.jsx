import { useContext } from "react";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";

export default function NotFound() {
  const {theme} = useContext(ThemeContext)
  return (<>
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <FaExclamationTriangle className="text-danger" size="100px"/>
      <h2 className="mt-2 mb-1 text-danger">404</h2>
      <p>No page found on this path!</p>
      <Link to="/" className={`btn d-flex align-items-center btn-${theme}`}>
        <FaHome className="me-1"/>Home
      </Link>
    </div>
  </>)
}
