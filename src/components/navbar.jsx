import React from 'react'
import { useStaticQuery, Link, graphql } from "gatsby"
import Quill from '../assets/noun_quill.svg';

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
      </div>
    </nav>
  )
}