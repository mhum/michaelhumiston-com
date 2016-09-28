const PageHeader = ({ page }) => (
  <div id="page-header">
    <h1>
      { page }
    </h1>
  </div>
);

PageHeader.propTypes = {
  page: React.PropTypes.string.isRequired
};

export default PageHeader;
