import { Col, Image } from 'react-bootstrap';

import ProjectPoints from './ProjectPoints';

const getProjectDescription = project => (
  {
    __html: project.descriptionExtended
  }
);

const TopView = ({ project }) => (
  <div>
    <Col sm={12} md={7}>
      <Image src={`assets/images/${project.image}`} responsive />
    </Col>
    <Col sm={12} md={5}>
      <Col xs={12}>
        <ProjectPoints
          className="project-points-side"
          project={project}
        />
      </Col>
      <Col
        xs={12}
        className="project-description visible-xs-block visible-sm-block visible-lg-block"
        dangerouslySetInnerHTML={getProjectDescription(project)}
      />
    </Col>
    <Col
      md={12}
      className="project-description visible-md-block"
      dangerouslySetInnerHTML={getProjectDescription(project)}
    />
  </div>
);

TopView.propTypes = {
  project: React.PropTypes.shape({
    image: React.PropTypes.string.isRequired
  }).isRequired
};

export default TopView;
