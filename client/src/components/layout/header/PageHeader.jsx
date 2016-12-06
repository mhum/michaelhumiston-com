const PageHeader = ({ title }) => (
  <div id="page-header">
    <h1>{title}</h1>
  </div>
);

PageHeader.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default PageHeader;
