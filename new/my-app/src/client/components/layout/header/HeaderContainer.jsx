import React from 'react';
import PropTypes from 'prop-types';

import Logo from './Logo';
// import Navbar from './Navbar';
import PageHeader from './PageHeader';

const HeaderContainer = ({ title, links, projects }) => (
  <div>
    {/* <Navbar links={links} projects={projects} /> */}
    <Logo />
    <PageHeader title={title} />
  </div>
);

HeaderContainer.defaultProps = {
  projects: []
};

HeaderContainer.propTypes = {
  // title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({}))
};

export default HeaderContainer;
