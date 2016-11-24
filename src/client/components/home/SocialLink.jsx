const SocialLink = ({ site }) => (
  <div className={`${site.name} icon-link`}>
    <div className="icon">
      <a href={site.url} target="_blank" rel="noopener noreferrer">
        <i className={`fa fa-${site.name} fa-3x`} aria-hidden="true" />
      </a>
    </div>
  </div>
);

SocialLink.propTypes = {
  site: React.PropTypes.shape({
    name: React.PropTypes.string,
    url: React.PropTypes.string
  }).isRequired
};

export default SocialLink;
