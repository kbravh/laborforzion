import React from "react"
import {Helmet} from 'react-helmet';
import { graphql } from "gatsby"
import Layout from "../components/Layout"

import '../css/blog-post.css'

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <Helmet defer={false}>
        <title>{post.frontmatter.title}</title>
        <meta name="description" content={post.excerpt} />
        <meta name="author" content="Karey Higuera" />
      </Helmet>
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
      excerpt
      frontmatter {
        title
        logoImage {
          publicURL
        }
      }
    }
  }
`