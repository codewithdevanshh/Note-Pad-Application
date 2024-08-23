import React, {useContext} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ModeContext from '../Context/Mode/ModeContext'

const Navbar = (props) => {
    const a = useContext(ModeContext);
    let location = useLocation();
    let navigate = useNavigate();

    const handleLogout = async () =>{
      await localStorage.removeItem('token');
      // localStorage.clear();
      navigate("/Login");
    }

  return (
    <>
    <nav className={`navbar navbar-expand-sm bg-${a.mode} navbar-${a.mode}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">INotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/About' ? "active" : ""}`} to="/About">About Us</Link>
            </li>
            <li className="nav-item">
            {!localStorage.getItem('token') ?<Link className={`nav-link ${location.pathname === '/Login' ? "active" : ""}`} to="/Login">Login</Link> 
            :
            <Link onClick={handleLogout} className='nav-link'>Logout</Link>}
            </li> 
            <li className="nav-item">
            {!localStorage.getItem('token') ?<Link className={`nav-link ${location.pathname === '/SignUp' ? "active" : ""}`} to="/SignUp">Sign Up</Link>  
            :""} 
            </li> 
          </ul>
          <div className={`mx-5 form-check form-switch text-${a.mode === 'light'?'dark':'light'}`}>
            <input className="form-check-input" onClick={a.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckChecked"/>
            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Enabled {a.mode} Mode</label>
          </div>
        </div>
      </div>
    </nav>
  </>
  )
}

export default Navbar
