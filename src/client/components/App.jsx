import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';

import HeaderContainer from './layout/header/HeaderContainer';
import { setPageTitle } from '../redux/actions';

const App = ({ pageTitle, links, projects, setTitle, children }) => (
  <Grid id="container">
    <HeaderContainer
      title={pageTitle}
      links={links}
      projects={projects}
    />
    {
      React.cloneElement(children, {
        setTitle,
        projects
      })
    }
  </Grid>
);

App.propTypes = {
  children: React.PropTypes.shape({
    name: React.PropTypes.string,
    url: React.PropTypes.string
  }).isRequired,
  projects: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  links: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  pageTitle: React.PropTypes.string,
  setTitle: React.PropTypes.func
};

App.defaultProps = {
  links: [
    {
      uri: '/',
      name: 'Home',
      isIndex: true,
      hasSubMenu: false
    }, {
      uri: 'projects',
      name: 'Projects',
      isIndex: false,
      hasSubMenu: true
    }, {
      uri: 'about',
      name: 'About Me',
      isIndex: false,
      hasSubMenu: false
    }, {
      uri: 'contact',
      name: 'Contact',
      isIndex: false,
      hasSubMenu: false
    }
  ]
};

const mapStateToProps = state => (
  {
    pageTitle: state.reducers.pageTitle,
    projects: state.reducers.projects
  }
);

const mapDispatchToProps = dispatch => (
  {
    setTitle: (text) => {
      dispatch(setPageTitle(text));
    }
  }
);

const ReduxApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ReduxApp;
