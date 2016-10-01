import Breadcrumbs from 'react-breadcrumbs';

const PageHeader = ({ routes, params }) => (
  <div id="page-header">
    <Breadcrumbs
      separator=" | "
      routes={routes}
      params={params}
    />
  </div>
);

PageHeader.propTypes = {
  routes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  params: React.PropTypes.shape({}).isRequired
};

export default PageHeader;
