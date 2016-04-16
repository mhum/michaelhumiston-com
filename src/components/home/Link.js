const Link = ({ site }) => (
  <div className={site.name}>
    <div className="icon">
      <a href={site.url} target="_blank">
        <i className={`fa fa-${site.name} fa-3x`} aria-hidden="true"></i>
      </a>
    </div>

    <div className="link">
      <a href={site.url} target="_blank">
        {site.url}
      </a>
    </div>
  </div>
);

Link.propTypes = {
  site: React.PropTypes.object.isRequired
};

export default Link;
