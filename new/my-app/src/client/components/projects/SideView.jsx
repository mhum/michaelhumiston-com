import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import ProjectPoints from './ProjectPoints';

const getProjectDescription = project => (
  {
    __html: project.descriptionExtended
  }
);

const TopView = ({ project }) => (
  <Row>
    <Col sm={12} md={7}  className="project-image">
      <Image src={`/assets/images/${project.image}`} fluid />
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
        className="project-description d-md-none d-xl-block"
        dangerouslySetInnerHTML={getProjectDescription(project)}
      />
    </Col>
    <Col
      md={12}
      className="project-description d-none d-md-block d-xl-none"
      dangerouslySetInnerHTML={getProjectDescription(project)}
    />
  </Row>
);

TopView.propTypes = {
  project: PropTypes.shape({
    image: PropTypes.string.isRequired
  }).isRequired
};

export default TopView;
