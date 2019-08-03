import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';

import HeaderContainer from './layout/header/HeaderContainer';
import { setPageTitle, getProjects } from '../redux/actions';

class App extends React.Component {
  componentDidMount() {
    const { getProjectList } = this.props;
    getProjectList();
  }

  render() {
    const {
      children, pageTitle, links, projects, setTitle
    } = this.props;
    return (
      <Grid id="container">
        <HeaderContainer
          title={pageTitle}
          links={links}
          projects={projects.list}
        />
        {
          React.cloneElement(children, {
            setTitle,
            projects: projects.list
          })
        }
      </Grid>
    );
  }
}

App.propTypes = {
  children: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string
  }).isRequired,
  projects: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.object),
    fetching: PropTypes.bool
  }).isRequired,
  links: PropTypes.arrayOf(PropTypes.object),
  pageTitle: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  getProjectList: PropTypes.func.isRequired
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
    pageTitle: state.reducers.pageTitle.title,
    projects: state.reducers.projects
  }
);

const mapDispatchToProps = dispatch => (
  {
    setTitle: (text) => {
      dispatch(setPageTitle(text));
    },
    getProjectList: () => {
      dispatch(getProjects());
    }
  }
);

const ReduxApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ReduxApp;
