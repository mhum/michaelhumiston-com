import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
// import { connect } from 'react-redux';

import HeaderContainer from './layout/header/HeaderContainer';
// import { setPageDescription, setPageTitle, getProjects } from '../redux/actions';

class App extends React.Component {
  componentDidMount() {
    // const { getProjectList } = this.props;
    // getProjectList();
  }

  render() {
    // const {
    //   children, pageTitle, links, projects, setTitle, setDescription
    // } = this.props;    
    const {
        children, pageTitle, links, projects
    } = this.props;
    return (
      <Container id="container">
        <HeaderContainer
          title={pageTitle}
          links={links}
          projects={projects.list}
        />
        {
          React.cloneElement(children, {
            // setTitle,
            // setDescription,
            projects: projects.list
          })
        }
      </Container>
    );
  }
}

App.propTypes = {
//   children: PropTypes.shape({
//     name: PropTypes.string,
//     url: PropTypes.string
//   }).isRequired,
  projects: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.object),
    fetching: PropTypes.bool
  }).isRequired,
  links: PropTypes.arrayOf(PropTypes.object),
//   pageTitle: PropTypes.string.isRequired,
//   setDescription: PropTypes.func.isRequired,
//   setTitle: PropTypes.func.isRequired,
//   getProjectList: PropTypes.func.isRequired
};

App.defaultProps = {
    projects: {
        list: []
    },
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

// const mapStateToProps = state => (
//   {
//     pageDescription: state.reducers.pageDescription.description,
//     pageTitle: state.reducers.pageTitle.title,
//     projects: state.reducers.projects
//   }
// );

// const mapDispatchToProps = dispatch => (
//   {
//     setTitle: (text) => {
//       dispatch(setPageTitle(text));
//     },
//     setDescription: (text) => {
//       dispatch(setPageDescription(text));
//     },
//     getProjectList: () => {
//       dispatch(getProjects());
//     }
//   }
// );

// const ReduxApp = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);

// export default ReduxApp;
export default App;
