const ProjectPoints = ({ project, className }) => (
  <div className={className}>
    <ul className="project-points">
      <li> <span>Name:</span> {project.name}</li>
      <li> <span>Language:</span> {project.language}</li>
      <li> <span>Frameworks:</span> {project.framework}</li>
      <li> <span>Repository: </span>
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer noopener"
        >
          {project.repo}
        </a>
      </li>
      <li> <span>Current Version:</span> {project.currentVersion}</li>
    </ul>
  </div>
);

ProjectPoints.propTypes = {
  project: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    language: React.PropTypes.string.isRequired,
    framework: React.PropTypes.string.isRequired,
    repo: React.PropTypes.string.isRequired,
    currentVersion: React.PropTypes.string.isRequired
  }).isRequired,
  className: React.PropTypes.string.isRequired
};

export default ProjectPoints;
