import _ from 'lodash';

import TopView from './TopView';
import SideView from './SideView';

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

  render() {
    const project = this.getProject(this.props.params.projectName);
    let View;

    switch (project.pageStyle) {
      case 'top':
        View = TopView;
        break;
      case 'side':
        View = SideView;
        break;
      default:
        break;
    }
    return (
      <View project={project} />
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
