import React from 'react';
import styled from 'styled-components';
import SEO from 'components/SEO/SEO';
import Layout from 'layouts/Layout';
import Filters from 'components/Filters/Filters';

const FiltersWrapper = styled.div`
  margin: 25px 0;
  ${({ theme }) => theme.mq.md} {
    margin: 40px 0;
  }
  ${({ theme }) => theme.mq.lg} {
    margin: 55px 0;
  }
`;

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <FiltersWrapper>
        <Filters />
      </FiltersWrapper>
    </Layout>
  );
};

export default IndexPage;
