import React from 'react';
import SEO from 'components/SEO/SEO';
import Layout from 'layouts/Layout';
import useTheme from 'hooks/useTheme';

const IndexPage = () => {
  const { toggleTheme } = useTheme();
  return (
    <Layout>
      <SEO title="Home" />
      <div>siema</div>
      <button onClick={toggleTheme} type="button">
        click
      </button>
    </Layout>
  );
};

export default IndexPage;
