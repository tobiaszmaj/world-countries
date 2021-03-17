import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'layouts/Layout';

export const wrapPageElement = ({ element, props: { location } }) => {
    return <Layout location={location}>{element}</Layout>;
};

export const shouldUpdateScroll = ({
    routerProps: { location },
    getSavedScrollPosition,
}) => {
    if (location.action === 'PUSH') {
        window.setTimeout(() => window.scrollTo(0, 0), 300);
    } else {
        const savedPosition = getSavedScrollPosition(location);
        window.setTimeout(() => window.scrollTo(...(savedPosition || [0, 0])), 300);
    }
    return false;
};

wrapPageElement.propTypes = {
    props: PropTypes.objectOf(PropTypes.string).isRequired,
    element: PropTypes.element.isRequired,
};