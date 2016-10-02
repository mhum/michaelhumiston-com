import { Col, Row } from 'react-bootstrap';
import _ from 'lodash';

class Project extends React.Component {
  componentDidMount() {
    const projectName = this.props.params.projectName;
    const projects = this.props.projects;
    const project = _.find(projects, { id: projectName });

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

Project.propTypes = {
  params: React.PropTypes.shape({
    projectName: React.PropTypes.string.isRequired
  }).isRequired,
  projects: React.PropTypes.arrayOf(React.PropTypes.object),
  setTitle: React.PropTypes.func
};

export default Project;
