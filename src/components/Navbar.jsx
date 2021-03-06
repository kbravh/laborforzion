import React, { Component } from 'react'
import { useStaticQuery, Link, graphql } from "gatsby"
import Pyramid from '../assets/pyramid.svg';
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
          <img src={Pyramid} alt="" />
          {/* Icon by Prosymbols at flaticon */}
          <h2>{data.site.siteMetadata.title}</h2>
        </Link>

        <div id="nav-links">
          <Link to={`/about/`}>About</Link>

          <Link to={`/projects/`}>Projects</Link>
        </div>
        <NavLinks />
      </div>
    </nav>
  )
}

class NavLinksClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: false
    }
  }

  // close menu when clicking outside of it
  handleClickOutside = evt => {
    this.setState({
      isMenuOpen: false
    });
  }

  toggleMenu = () => {
    this.setState(prevState => {
      return{
        isMenuOpen: !prevState.isMenuOpen
      }
    })
  }
  render() {
    return (
      <div id="mobile-menu">
        <div className="menu-logo" onClick={this.toggleMenu}>
          <img src={MenuIcon} alt="Menu" />
        </div>
        {/* show dropdown menu if state set to true */}
        {this.state.isMenuOpen &&
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
}

const NavLinks = onClickOutside(NavLinksClass);
