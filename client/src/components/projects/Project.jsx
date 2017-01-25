import _find from 'lodash/find';

import TopView from './TopView';
import SideView from './SideView';

class Project extends React.Component {

  static getProject(projectName, projects) {
    return _find(projects, { shortName: projectName });
  }

  componentDidMount() {
    const project = Project.getProject(this.props.params.projectName, this.props.projects);

    if (project) {
      this.props.setTitle(project.name);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.projectName !== nextProps.params.projectName ||
      (this.props.projects.length === 0 && nextProps.projects.length > 0)) {
      const project = Project.getProject(nextProps.params.projectName, nextProps.projects);

      if (project) {
        this.props.setTitle(project.name);
      }
    }
  }

  render() {
    const project = Project.getProject(this.props.params.projectName, this.props.projects);

    if (project) {
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

    return (<div />);
  }
}

Project.propTypes = {
  params: React.PropTypes.shape({
    projectName: React.PropTypes.string.isRequired
  }).isRequired,
  projects: React.PropTypes.arrayOf(React.PropTypes.object),
  setTitle: React.PropTypes.func
};

Project.defaultProps = {
  projects: [],
  setTitle: null
};

export default Project;
