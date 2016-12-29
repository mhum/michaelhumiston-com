import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';

import HeaderContainer from './layout/header/HeaderContainer';
import { setPageTitle, getProjects, sendEmail, dismissSuccess, dismissError, updateField, updateFields } from '../redux/actions';

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
            projects: this.props.projects.list,
            submitContact: this.props.submitContact,
            contact: this.props.contact,
            dismissContactSuccess: this.props.dismissContactSuccess,
            dismissContactError: this.props.dismissContactError,
            updateContactField: this.props.updateContactField,
            updateContactFields: this.props.updateContactFields
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
    list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    fetching: React.PropTypes.bool
  }).isRequired,
  links: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  pageTitle: React.PropTypes.string,
  setTitle: React.PropTypes.func,
  getProjectList: React.PropTypes.func,
  submitContact: React.PropTypes.func,
  contact: React.PropTypes.shape({}),
  dismissContactSuccess: React.PropTypes.func,
  dismissContactError: React.PropTypes.func,
  updateContactField: React.PropTypes.func,
  updateContactFields: React.PropTypes.func
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
    projects: state.reducers.projects,
    contact: state.reducers.contact
  }
);

const mapDispatchToProps = dispatch => (
  {
    setTitle: (text) => {
      dispatch(setPageTitle(text));
    },
    getProjectList: () => {
      dispatch(getProjects());
    },
    submitContact: (details) => {
      dispatch(sendEmail(details));
    },
    dismissContactSuccess: () => {
      dispatch(dismissSuccess());
    },
    dismissContactError: () => {
      dispatch(dismissError());
    },
    updateContactField: (name, value) => {
      dispatch(updateField(name, value));
    },
    updateContactFields: (fields) => {
      dispatch(updateFields(fields));
    }

  }
);

const ReduxApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ReduxApp;