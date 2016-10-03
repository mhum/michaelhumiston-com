import { Col, Image, Row } from 'react-bootstrap';
import _ from 'lodash';

class Project extends React.Component {
  componentDidMount() {
    const project = this.getProject(this.props.params.projectName);

    this.props.setTitle(project.name);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.projectName !== nextProps.params.projectName) {
      const project = this.getProject(nextProps.params.projectName);

      this.props.setTitle(project.name);
    }
  }

  getProject(projectName, reset = false) {
    let project;

    if (project || reset) {
      return project;
    }

    const projects = this.props.projects;
    project = _.find(projects, { id: projectName });

    return project;
  }

  getProjectDescription(proj) {
    return {
      __html: proj.descriptionExtended
    };
  }

  render() {
    const project = this.getProject(this.props.params.projectName);
    return (
      <Row>
        <Col xs={7}>
          <Image src={`/assets/images/${project.image}`} responsive />
        </Col>
        <Col xs={5}>
          <div
            className="project-description"
            dangerouslySetInnerHTML={this.getProjectDescription(project)}
          />
          <div className="project-points">
            <ul>
              <li> <span>Name:</span> {project.name}</li>
              <li> <span>Language:</span> {project.language}</li>
              <li> <span>Framework:</span> {project.framework}</li>
              <li> <span>Repository: </span>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {project.repo}
                </a>
              </li>
            </ul>
          </div>
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
