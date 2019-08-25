import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import HeaderContainer from './layout/header/HeaderContainer';
import About from './about/About';
import Home from './home/Home';
import { setPageDescription, setPageTitle, getProjects } from '../redux/actions';

class App extends React.Component {
  componentDidMount() {
    const { getProjectList } = this.props;
    getProjectList();
  }

  render() {
    const {
      pageTitle, links, projects, setTitle, setDescription
    } = this.props;   
    
    return (
      <Container id="container">
        <HeaderContainer
          title={pageTitle}
          links={links}
          projects={projects.list}
        />
        <Switch>
          <Route exact path="/" render={() => <Home setTitle={setTitle} setDescription={setDescription} />} />
          <Route path="/about" render={() => <About setTitle={setTitle} setDescription={setDescription} />} />
        </Switch>
      </Container>
    );
  }
}

App.propTypes = {
  projects: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.object),
    fetching: PropTypes.bool
  }).isRequired,
  links: PropTypes.arrayOf(PropTypes.object),
  pageTitle: PropTypes.string,
  setDescription: PropTypes.func.isRequired,
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
      uri: '/projects',
      name: 'Projects',
      isIndex: false,
      hasSubMenu: true
    }, {
      uri: '/about',
      name: 'About Me',
      isIndex: false,
      hasSubMenu: false
    }, {
      uri: '/contact',
      name: 'Contact',
      isIndex: false,
      hasSubMenu: false
    }
  ]
};

const mapStateToProps = state => (
  {
    pageDescription: state.reducers.pageDescription.description,
    pageTitle: state.reducers.pageTitle.title,
    projects: state.reducers.projects
  }
);

const mapDispatchToProps = dispatch => (
  {
    setTitle: (text) => {
      dispatch(setPageTitle(text));
    },
    setDescription: (text) => {
      dispatch(setPageDescription(text));
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
