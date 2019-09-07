import React, {useState} from 'react'
import { useStaticQuery, Link, graphql } from "gatsby"
import Quill from '../assets/noun_quill.svg';
import onClickOutside from "react-onclickoutside";
import MenuIcon from '../assets/menu.svg'; 

import '../css/navbar.css'

export default () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
              title
          }
        }
      }
  `
  )
  return (
    <nav>
      <div>
        <Link to={`/`} className="brand-logo">
          <img src={Quill} alt=""/>
          <h2>{data.site.siteMetadata.title}</h2>
        </Link>

        <div id="nav-links">
          <Link to={`/about/`}>About</Link>

          <Link to={`/projects/`}>Projects</Link>
        </div>
        <NavLinks/>
      </div>
    </nav>
  )
}

const NavLinksBase = () => {
  const [isMenuOpen, setMenu] = useState(false);

  // close menu when clicking outside of it
  NavLinksBase.handleClickOutside = evt => {
    setMenu(false);
  }

  const toggleMenu = () => {
    setMenu(!isMenuOpen)
  }

  return (
    <div id="mobile-menu">
      <div className="menu-logo" onClick={toggleMenu}>
        <img src={MenuIcon} alt="Menu" />
      </div>
      {/* show dropdown menu if state set to true */}
      {isMenuOpen &&
        <div className="menu">
          <ul className="menu-list">
            <li><Link to={`/about/`}>About</Link></li>
            <li><Link to={`/projects/`}>Projects</Link></li>
          </ul>
        </div>
      }
    </div>
  )
}

const clickOutsideConfig = {
  handleClickOutside: () => NavLinksBase.handleClickOutside
};

const NavLinks = onClickOutside(NavLinksBase, clickOutsideConfig)
