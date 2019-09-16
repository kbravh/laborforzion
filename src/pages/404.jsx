import React from 'react';
import Layout from "../components/Layout";
import { Link } from 'gatsby';

export default () => {
    return (
        <Layout>
            <h1>Uh oh! We we couldn't find that page.</h1>
            <Link>Go Home</Link>
        </Layout>
    )
}