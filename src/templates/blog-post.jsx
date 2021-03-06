import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

import "../css/blog-post.css"

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <Helmet defer={false}>
        <title>{post.frontmatter.title}</title>
        <meta name="description" content={post.excerpt} />
        <meta name="author" content="Karey Higuera" />
        <meta property="og:url" content="" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.frontmatter.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.frontmatter.banner.publicURL} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="" />
        <meta name="twitter:author" content="" />
      </Helmet>
      <div>
        <div className="blog-post-header">
          <img src={post.frontmatter.logoImage.publicURL} alt="" />
          <h1 className="blog-post-title">{post.frontmatter.title}</h1>
        </div>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      excerpt
      frontmatter {
        title
        banner {
          publicURL
        }
        logoImage {
          publicURL
        }
      }
    }
  }
`
