import React from 'react';
import PropTypes from 'prop-types';

import TopView from './TopView';
import SideView from './SideView';

class Project extends React.Component {
  static getProject(projectName, projects) {
    return projects.find(project => project.shortName === projectName);
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
