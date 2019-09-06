import React from "react"
import Layout from "../components/Layout";
import { graphql } from "gatsby"

import '../css/about.css';

export default ({ data }) => (
  <Layout>
    <h1 className="page-title">About {data.site.siteMetadata.title}</h1>
    <h4 className="about-title">This site is a personal project of mine to share what I learn in my studies. It is also a repository for different projects that I have created that I feel may be of use to others.</h4>
  </Layout>
)
export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`