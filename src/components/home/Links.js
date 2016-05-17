import Link from './Link';

const Links = ({ sites }) => (
  <div className="social-links">
    <h1>Links</h1>
    <div className="link-container">
    {
      sites.map((v, i) => (
        <Link key={i} site={v} />
      ))
    }
    </div>
  </div>
);

Links.propTypes = {
  sites: React.PropTypes.array.isRequired
};

Links.defaultProps =
{
  sites: [
    {
      name: 'github',
      url: 'https://github.com/mhum'
    }, {
      name: 'linkedin',
      url: 'https://linkedin.com/in/michaelhumiston'
    }, {
      name: 'flickr',
      url: 'https://www.flickr.com/photos/michaelhumiston'
    }, {
      name: 'facebook',
      url: 'https://www.facebook.com/michaelhumiston'
    }]
};

export default Links;
