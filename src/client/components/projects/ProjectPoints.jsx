import React from 'react';
import PropTypes from 'prop-types';

const ProjectPoints = ({ project, className }) => (
  <div className={className}>
    <ul className="project-points">
      <li>
        {' '}
        <span>Name:</span>
        {' '}
        {project.name}
      </li>
      <li>
        {' '}
        <span>Language:</span>
        {' '}
        {project.language}
      </li>
      <li>
        {' '}
        <span>Frameworks:</span>
        {' '}
        {project.framework}
      </li>
      <li>
        {' '}
        <span>Repository: </span>
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer noopener"
        >
          {project.repo}
        </a>
      </li>
      <li>
        {' '}
        <span>Current Version:</span>
        {' '}
        {project.currentVersion}
      </li>
    </ul>
  </div>
);

ProjectPoints.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    framework: PropTypes.string.isRequired,
    repo: PropTypes.string.isRequired,
    currentVersion: PropTypes.string.isRequired
  }).isRequired,
  className: PropTypes.string.isRequired
};

export default ProjectPoints;
