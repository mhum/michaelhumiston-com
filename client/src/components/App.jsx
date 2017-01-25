import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';

import HeaderContainer from './layout/header/HeaderContainer';
import { setPageTitle, getProjects } from '../redux/actions';

class App extends React.Component {
  componentDidMount() {
    this.props.getProjectList();
  }

  render() {
    return (
      <Grid id="container">
        <HeaderContainer
          title={this.props.pageTitle}
          links={this.props.links}
          projects={this.props.projects.list}
        />
        {
          React.cloneElement(this.props.children, {
            setTitle: this.props.setTitle,
            projects: this.props.projects.list
          })
        }
      </Grid>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.shape({
    name: React.PropTypes.string,
    url: React.PropTypes.string
  }).isRequired,
  projects: React.PropTypes.shape({
    list: React.PropTypes.arrayOf(React.PropTypes.object),
    fetching: React.PropTypes.bool
  }).isRequired,
  links: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  pageTitle: React.PropTypes.string.isRequired,
  setTitle: React.PropTypes.func.isRequired,
  getProjectList: React.PropTypes.func.isRequired
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
