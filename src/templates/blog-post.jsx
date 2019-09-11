import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

import '../css/blog-post.css'

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <div>
        <h1 className="blog-post-title"><img src={post.frontmatter.logoImage.publicURL} alt=""/>
          {post.frontmatter.title}
        </h1>
        <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    markdownRemark {
      html
      frontmatter {
        title
        logoImage {
          publicURL
        }
      }
    }
  }
`