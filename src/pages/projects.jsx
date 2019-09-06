import React from "react";
import Layout from "../components/Layout";
import Scriptly from '../assets/scriptly.svg';

import '../css/projects.css';

const projects = [
    {
        name: "Scriptly",
        description: "Take your patriarchal blessing and style it like pages from the scriptures.",
        link: "https://scriptly.restorerofpaths.com",
        image: Scriptly
    }
]

export default () => (
    <Layout>
        <h1 className="page-title">Projects</h1>
        <h4 className="project-intro">Here are projects that I've created that you may find useful.</h4>
        <div className="project-container">
            {projects.map((project, index) => (
                <div key={index} className="project-card">
                    <a href={project.link} className="project-link"> </a>
                    <div className="project-card-title">
                        <img src={project.image} width="25px" height="25px" alt="" />
                        {project.name}
                    </div>
                    <p>{project.description}</p>
                </div>
            ))}
        </div>
    </Layout>
)