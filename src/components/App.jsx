import { Grid } from 'react-bootstrap';

import HeaderContainer from './layout/header/HeaderContainer';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageTitle: 'Page Title'
    };

    this.setTitle = this.setTitle.bind(this);
  }

  setTitle(pageTitle) {
    this.setState({
      pageTitle
    });
    document.title = `${pageTitle} - Michael Humiston`;
  }

  render() {
    return (
      <Grid id="container">
        <HeaderContainer
          title={this.state.pageTitle}
          links={this.props.links}
        />
        {
          React.cloneElement(this.props.children, {
            setTitle: this.setTitle,
            projects: this.props.projects
          })
        }
      </Grid>
    );
  }
}

const projects = [
  {
    id: 'lean-coffee',
    name: 'Lean Coffee',
    description: 'Simple Ruby on Rails web application for distributed Lean Coffee sessions.',
    uri: 'project/lean-coffee'
  }, {
    id: 'workout-tracker',
    name: 'Workout Tracker',
    description: 'A workout tracker written using the Ruby on Rails framework.',
    uri: 'project/workout-tracker'
  }, {
    id: 'pia-updater',
    name: 'Private Internet Access Transmission Updater',
    description: 'Script for updating the port for Transmission with port from PIA.',
    uri: 'project/pia-updater',
    image: 'projects/pia-updater.png'
  }, {
    id: 'world-clock',
    name: 'World Office Clock',
    description: 'Dashboard for tracking current office times around the world written using Ext JS.',
    uri: 'project/world-clock'
  }, {
    id: 'enhanced-world-clock',
    name: 'Enhanced World Office Clock',
    description: 'Dashboard for tracking current office times around the world written using JavaServer Faces.',
    uri: 'project/enhanced-world-clock'
  }
];

App.propTypes = {
  children: React.PropTypes.shape({
    name: React.PropTypes.string,
    url: React.PropTypes.string
  }).isRequired,
  projects: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  links: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

App.defaultProps = {
  projects,
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
      hasSubMenu: true,
      items: projects
    }, {
      uri: 'about',
      name: 'About Me',
      isIndex: false,
      hasSubMenu: false
    }
  ]
};

export default App;
