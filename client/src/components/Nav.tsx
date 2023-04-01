import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/auth/authSlice";

export const Nav: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());    
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">MERN SANDBOX</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav w-100">
            <li className="nav-item">
              {/* <a className="nav-link" href="#">Features</a> */}
              <Link to="/orders" className="nav-link">Orders</Link>
            </li>
            {/* <li className="dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown link
              </a>
              <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown link
              </button>
              <ul className="dropdown-menu">
                <li onClick={() => { console.log('logout clicked') }}>Logout</li>
              </ul>
            </li> */}
            <li className="ms-auto nav-item">
              <button className="btn" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>);
}