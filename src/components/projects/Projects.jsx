import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router';

class Projects extends React.Component {
  componentDidMount() {
    this.props.setTitle(this.props.pageTitle);
  }

  render() {
    const projects = this.props.projects;
    return (
      <Row>
        {
          projects.map((v, i) =>
            <Link to={`project/${v.uri}`} key={i}>
              <Col xs={4} className="project-block">
                <h3>{v.name}</h3>
                <p>{v.description}</p>
              </Col>
            </Link>
          )
        }
      </Row>
    );
  }
}

Projects.defaultProps = {
  pageTitle: 'Projects',
  projects: [
    {
      name: 'Lean Coffee',
      description: 'Simple Ruby on Rails web application for distributed Lean Coffee sessions.',
      uri: 'lean-coffee'
    }, {
      name: 'Workout Tracker',
      description: 'A workout tracker written using the Ruby on Rails framework.',
      uri: 'workout-tracker'
    }, {
      name: 'Private Internet Access Transmission Updater',
      description: 'Script for updating the port for Transmission with port from PIA.',
      uri: 'pia-updater'
    }, {
      name: 'World Office Clock',
      description: 'Dashboard for tracking current office times around the world written using Ext JS.',
      uri: 'world-clock'
    }, {
      name: 'Enhanced World Office Clock',
      description: 'Dashboard for tracking current office times around the world written using JavaServer Faces.',
      uri: 'enhanced-world-clock'
    }
  ]
};

Projects.propTypes = {
  pageTitle: React.PropTypes.string.isRequired,
  projects: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  setTitle: React.PropTypes.func
};

export default Projects;
