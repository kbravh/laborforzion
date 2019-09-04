import React from 'react'
import { useStaticQuery, Link, graphql } from "gatsby"

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
          <img src="/assets/noun_quill.svg" alt=""/>
          <span>{data.site.siteMetadata.title}</span>
        </Link>

        <div id="nav-links">
          <Link to={`/about/`}>About</Link>

          <Link to={`/projects/`}>Projects</Link>
        </div>
      </div>
    </nav>
  )
}