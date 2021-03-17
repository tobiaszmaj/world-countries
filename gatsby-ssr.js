import React from 'react';
import Layout from 'layouts/Layout';
import PropTypes from 'prop-types';

export const wrapPageElement = ({ element, props: { location } }) => {
    return <Layout location={location}>{element}</Layout>;
};

wrapPageElement.propTypes = {
    props: PropTypes.objectOf(PropTypes.object).isRequired,
    element: PropTypes.element.isRequired,
};