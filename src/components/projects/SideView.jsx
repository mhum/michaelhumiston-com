import { Col, Image, Row } from 'react-bootstrap';

import ProjectPoints from './ProjectPoints';

const getProjectDescription = project => (
  {
    __html: project.descriptionExtended
  }
);

const TopView = ({ project }) => (
  <Row>
    <Col xs={7}>
      <Image src={`/assets/images/${project.image}`} responsive />
    </Col>
    <Col xs={5}>
      <div
        className="project-description"
        dangerouslySetInnerHTML={getProjectDescription(project)}
      />
      <ProjectPoints
        className="project-points-side"
        project={project}
      />
    </Col>
  </Row>
);

TopView.propTypes = {
  project: React.PropTypes.shape({
    image: React.PropTypes.string.isRequired
  }).isRequired
};

export default TopView;
