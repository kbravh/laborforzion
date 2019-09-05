import React from "react"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"

import Navbar from './Navbar'

export default ({ children }) => {
  return <div>
    <Navbar />
    <div
      css={css`
      margin: 0 auto;
      max-width: 700px;
      padding: ${rhythm(2)};
      padding-top: ${rhythm(1.5)};
    `}
    >
      {children}
    </div>
  </div>
}