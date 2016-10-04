import { Col, Image, Row } from 'react-bootstrap';

import ProjectPoints from './ProjectPoints';

const getProjectDescription = project => (
  {
    __html: project.descriptionExtended
  }
);

const TopView = ({ project }) => (
  <Row>
    <Col xs={12}>
      <Row>
        <Col xs={12}>
          <Image src={`/assets/images/${project.image}`} responsive />
        </Col>
      </Row>
    </Col>
    <Col xs={12}>
      <Row className="project-info">
        <Col xs={8}>
          <div
            className="project-description"
            dangerouslySetInnerHTML={getProjectDescription(project)}
          />
        </Col>
        <Col xs={4}>
          <ProjectPoints
            className="project-points-top"
            project={project}
          />
        </Col>
      </Row>
    </Col>
  </Row>
);

TopView.propTypes = {
  project: React.PropTypes.shape({
    image: React.PropTypes.string.isRequired
  }).isRequired
};

export default TopView;
