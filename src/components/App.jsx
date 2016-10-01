import { Grid } from 'react-bootstrap';

import HeaderContainer from './layout/header/HeaderContainer';

const App = ({ children }) =>
  <Grid id="container">
    <HeaderContainer title={children.props.route.component.title} />
    {children}
  </Grid>;

App.propTypes = {
  children: React.PropTypes.shape({
    name: React.PropTypes.string,
    url: React.PropTypes.string
  }).isRequired
};

export default App;
