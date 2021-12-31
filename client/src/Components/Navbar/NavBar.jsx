import './navbar.css';
import person from '../../img/1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Context } from '../../Context/Context';

function NavBar() {
  const [navOpen, setNavOpen] = useState(false)
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({type: "LOGOUT"})
  }
  console.log(user)

  return (
    <div className="top">
      <div className="top-container">
        <div className="navLeft">
          <Link to="/">
            <span className="blogLogo">ReactBlog.</span>
          </Link>
        </div>
        <div className="hamburger" onClick={() => setNavOpen(!navOpen)}>
          <FontAwesomeIcon className="topHamburgerMenu" icon="bars" />
        </div>
        <div className={navOpen ? 'navRight navActive' : 'navRight'}>
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/">Home</Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/about">About</Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/contact">Contact</Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/create">Write</Link>
            </li>
          </ul>
          <li className="topListItem logout" onClick={handleLogout}>{user && "LOGOUT"}</li>
          <div className="user-action">
            {user ? (
              <Link to="/settings">
                <img className="topImg" src={user.profilePicture} alt="person" />
              </Link>
              ) : (
              <ul className="topList">
                <li className="topListItem">
                  <Link className="link" to="/login">Login</Link>
                </li>
                <li className="topListItem">
                  <Link className="link" to="/register">Register</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar;