import { Grid } from 'react-bootstrap';

import HeaderContainer from './layout/header/HeaderContainer';

const App = ({ children, routes, params }) =>
  <Grid id="container">
    <HeaderContainer routes={routes} params={params} />
    {children}
  </Grid>;

App.propTypes = {
  children: React.PropTypes.shape({
    name: React.PropTypes.string,
    url: React.PropTypes.string
  }).isRequired,
  routes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  params: React.PropTypes.shape({}).isRequired
};

export default App;
