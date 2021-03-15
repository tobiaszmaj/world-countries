import React from 'react';
import Layout from 'layouts/Layout';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

export const query = graphql`
  query Countries($id: String!) {
    allInternalCountries(filter: { id: { eq: $id } }) {
      nodes {
        id
        name
        capital
        flag
        region
        population
        nativeName
        subregion
        topLevelDomain
        currencies {
          code
        }
        languages {
          name
        }
        borders
      }
    }
  }
`;

const DetailedLayout = ({ data }) => {
    return (
        <Layout>
            <p>{data}</p>
        </Layout>
    );
};

DetailedLayout.propTypes = {
    data: PropTypes.shape({
        allInternalCountries: PropTypes.objectOf(PropTypes.array),
    }).isRequired,
};

export default DetailedLayout;