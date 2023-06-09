import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'


const Header = () => {
  const [hideMenu, setHideMenu] = useState(true)

  const [navbar, setNavbar] = useState(false)

  const changeBackground = () => {
    if (window.scrollY >= 90) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }

  window.addEventListener("scroll", changeBackground)


  return (
    <header className={navbar ? "header activeHeader" : "header"}>
      <div className="container">
        <NavLink id="logotype" to="/">Fixxo.</NavLink>
        <div id="menu" className={hideMenu ? 'hide' : ''}>
          <nav id="menu-links" className="links">
            <NavLink className="link" to="/">Home</NavLink>
            <NavLink className="link" to="/contacts">Contacts</NavLink>
          </nav>
          <nav id="menu-icons" className="icons">
            <NavLink className="link" to="/search"><i className="fa-regular fa-search"></i></NavLink>
            <NavLink className="link" to="/compare"><i className="fa-regular fa-code-compare"></i></NavLink>
            <NavLink className="link" to="/favorites"><i className="fa-regular fa-heart"></i></NavLink>
            <NavLink className="link" to="/cart"><i className="fa-regular fa-bag-shopping"></i></NavLink>
          </nav>
        </div>
        <div id="toggle-icon" className="icons">
          <button className="link" onClick={() => setHideMenu(!hideMenu)} ><i className="fa-regular fa-bars"></i></button>
        </div>

      </div>
    </header>
  )
}
export default Header