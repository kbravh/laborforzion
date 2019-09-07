import React from "react"
import { css } from "@emotion/core"
import { Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"
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
                <Link
                  to={node.fields.slug}
                  className="blog-link"
                  css={css`
                    text-decoration: none;
                    color: inherit;
                  `}
                >
                  <h3
                    css={css`
                      margin-bottom: ${rhythm(1 / 4)};
                    `}
                  >
                    {node.frontmatter.title}{" "}
                    <span
                      css={css`
                        color: #bbb;
                        font-size: 20px;
                      `}
                    >
                      — {node.frontmatter.date}
                    </span>
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
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`