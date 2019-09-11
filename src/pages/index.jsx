import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import {Helmet} from 'react-helmet';

import '../css/index.css';

export default ({ data }) => {
  return (
    <Layout>
      <Helmet>
        <title>Labor For Zion</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#d04925" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="apple-mobile-web-app-title" content="Labor For Zion" />
        <meta name="application-name" content="Labor For Zion" />
        <meta name="msapplication-TileColor" content="#d04925" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#d04925" />
      </Helmet>
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