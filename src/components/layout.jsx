import React from "react"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Navbar from './Navbar'
import '../css/layout.css';

export default ({ children }) => {
  return <div>
    <Navbar />
    <div className="site-container"
      css={css`
      padding: ${rhythm(2)};
      padding-top: ${rhythm(1.5)};
    `}
    >
      {children}
    </div>
  </div>
}