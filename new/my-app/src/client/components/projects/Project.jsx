import _find from 'lodash/find';
import PropTypes from 'prop-types';

import TopView from './TopView';
import SideView from './SideView';

class Project extends React.Component {
  static getProject(projectName, projects) {
    return _find(projects, { shortName: projectName });
  }

  componentDidMount() {
    const {
      params, projects, setTitle, setDescription
    } = this.props;
    const project = Project.getProject(params.projectName, projects);

    if (project) {
      setTitle(project.name);
      setDescription(project.description);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      params, projects, setTitle, setDescription
    } = this.props;
    if (params.projectName !== nextProps.params.projectName
      || (projects.length === 0 && nextProps.projects.length > 0)) {
      const project = Project.getProject(nextProps.params.projectName, nextProps.projects);

      if (project) {
        setTitle(project.name);
        setDescription(project.description);
      }
    }
  }

  render() {
    const { params, projects } = this.props;
    const project = Project.getProject(params.projectName, projects);

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

Project.defaultProps = {
  projects: [],
  setTitle: null,
  setDescription: null
};

Project.propTypes = {
  params: PropTypes.shape({
    projectName: PropTypes.string.isRequired
  }).isRequired,
  projects: PropTypes.arrayOf(PropTypes.object),
  setTitle: PropTypes.func,
  setDescription: PropTypes.func
};

export default Project;