import { Col, Row } from 'react-bootstrap';

const pageTitle = 'Projects';

class Projects extends React.Component {
  componentDidMount() {
    document.title = `${pageTitle} - Michael Humiston`;
  }

  render() {
    const projects = this.props.projects;
    return (
      <Row>
        <Col>
          {
            projects.map((v, i) =>
              <Col xs={4} key={i}>
                <h1>{v.name}</h1>
                <p>{v.description}</p>
              </Col>
            )
          }
        </Col>
      </Row>
    );
  }
}

Projects.title = pageTitle;

Projects.propTypes = {
  projects: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

Projects.defaultProps =
{
  projects: [
    {
      name: 'Lean Coffee',
      description: 'Simple Ruby on Rails web application for distributed Lean Coffee sessions.'
    }, {
      name: 'Workout Tracker',
      description: 'A workout tracker written using the Ruby on Rails framework.'
    }, {
      name: 'Private Internet Access Transmission Updater',
      description: 'Script for updating the port for Transmission with port from PIA.'
    }, {
      name: 'World Office Clock',
      description: 'Dashboard for tracking current office times around the world written using Ext JS.'
    }, {
      name: 'Enhanced World Office Clock',
      description: 'Dashboard for tracking current office times around the world written using JavaServer Faces.'
    }
  ]
};

export default Projects;
