import React from 'react';
import PropTypes from 'prop-types';

const PageHeader = ({ title }) => (
  <div id="page-header">
    <h1>{title}</h1>
  </div>
);

PageHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default PageHeader;
