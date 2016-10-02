import { Col, Row } from 'react-bootstrap';
import _ from 'lodash';

class Project extends React.Component {
  componentDidMount() {
    const projectName = this.props.params.projectName;
    const projects = this.props.projects;
    const project = _.find(projects, { uri: projectName });

    this.props.setTitle(project.name);
  }

  render() {
    return (
      <Row>
        <Col>
          Project stuff goes here!
        </Col>
      </Row>
    );
  }
}

Project.defaultProps = {
  projects: [
    {
      name: 'Lean Coffee',
      uri: 'lean-coffee'
    }, {
      name: 'Workout Tracker',
      uri: 'workout-tracker'
    }, {
      name: 'Private Internet Access Transmission Updater',
      uri: 'pia-updater'
    }, {
      name: 'World Office Clock',
      uri: 'world-clock'
    }, {
      name: 'Enhanced World Office Clock',
      uri: 'enhanced-world-clock'
    }
  ]
};

Project.propTypes = {
  params: React.PropTypes.shape({
    projectName: React.PropTypes.string.isRequired
  }).isRequired,
  projects: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  setTitle: React.PropTypes.func
};

export default Project;
