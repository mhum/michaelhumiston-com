import PropTypes from 'prop-types';
import { Col, Image } from 'react-bootstrap';

import ProjectPoints from './ProjectPoints';

const getProjectDescription = project => (
  {
    __html: project.descriptionExtended
  }
);

const TopView = ({ project }) => (
  <div>
    <Col xs={12}>
      <Image src={`assets/images/${project.image}`} responsive />
    </Col>
    <Col xs={12} className="project-info">
      <Col xs={12} lg={4}>
        <ProjectPoints
          className="project-points-top"
          project={project}
        />
      </Col>
      <Col xs={12} lg={8}>
        <div
          className="project-description"
          dangerouslySetInnerHTML={getProjectDescription(project)}
        />
      </Col>
    </Col>
  </div>
);

TopView.propTypes = {
  project: PropTypes.shape({
    image: PropTypes.string.isRequired
  }).isRequired
};

export default TopView;
