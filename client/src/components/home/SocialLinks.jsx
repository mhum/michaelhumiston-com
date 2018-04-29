import PropTypes from 'prop-types';

import SocialLink from './SocialLink';

const Links = ({ sites }) => (
  <div className="social-links">
    <h1>Social Links</h1>
    <div className="link-container">
      {
        sites.map(v => (
          <SocialLink key={v.id} site={v} />
        ))
      }
    </div>
  </div>
);

Links.propTypes = {
  sites: PropTypes.arrayOf(PropTypes.object)
};

Links.defaultProps =
{
  sites: [
    {
      id: 1,
      name: 'facebook',
      url: 'https://www.facebook.com/michaelhumiston'
    }, {
      id: 2,
      name: 'flickr',
      url: 'https://www.flickr.com/photos/michaelhumiston'
    }, {
      id: 3,
      name: 'github',
      url: 'https://github.com/mhum'
    }, {
      id: 4,
      name: 'linkedin',
      url: 'https://linkedin.com/in/michaelhumiston'
    }]
};

export default Links;
