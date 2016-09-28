import SocialLink from './SocialLink';

const Links = ({ sites }) => (
  <div className="social-links">
    <h3>Social Links</h3>
    <div className="link-container">
      {
        sites.map((v, i) => (
          <SocialLink key={i} site={v} />
        ))
      }
    </div>
  </div>
);

Links.propTypes = {
  sites: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

Links.defaultProps =
{
  sites: [
    {
      name: 'facebook',
      url: 'https://www.facebook.com/michaelhumiston'
    }, {
      name: 'flickr',
      url: 'https://www.flickr.com/photos/michaelhumiston'
    }, {
      name: 'github',
      url: 'https://github.com/mhum'
    }, {
      name: 'linkedin',
      url: 'https://linkedin.com/in/michaelhumiston'
    }]
};

export default Links;
