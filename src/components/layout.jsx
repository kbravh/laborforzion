import React from "react"
import Navbar from './Navbar'
import '../css/layout.css';

export default ({ children }) => {
  return <div>
    <Navbar />
    <div className="site-container">
      {children}
    </div>
  </div>
}