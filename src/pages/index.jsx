import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"

import '../css/index.css';

export default ({ data }) => {
  return (
    <Layout>
      <div>
        <h1 className="page-title">{data.site.siteMetadata.title}</h1>

        <h3 id="post-count">{data.allMarkdownRemark.totalCount} {data.allMarkdownRemark.totalCount === 1 ? `Post` : `Posts`}</h3>

        <div className="post-container">
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <div key={node.id} className="blog-card-background">
              <div className="blog-card">
                <Link to={node.frontmatter.path} className="blog-link">
                  <h3 className="blog-card-title">
                    {node.frontmatter.title}{" "}
                    <span className="blog-card-date"> — {node.frontmatter.date}</span>
                  </h3>
                  <p>{node.excerpt}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            path
          }
          excerpt
        }
      }
    }
  }
`