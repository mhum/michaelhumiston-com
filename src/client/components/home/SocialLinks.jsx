import React from 'react';
import PropTypes from 'prop-types';

import SocialLink from './SocialLink';

const Links = ({ sites }) => (
  <div className="social-links">
    <h1>Links</h1>
    <div className="link-container">
      {
        sites.map((v) => (
          <SocialLink key={v.id} site={v} />
        ))
      }
    </div>
  </div>
);

Links.propTypes = {
  sites: PropTypes.arrayOf(PropTypes.object)
};

Links.defaultProps = {
  sites: [
    {
      id: 1,
      name: 'github',
      url: 'https://github.com/mhum'
    }, {
      id: 2,
      name: 'linkedin',
      url: 'https://linkedin.com/in/michaelhumiston'
    }]
};

export default Links;
