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
    <Col xs={12}>
      <Image src={`/assets/images/${project.image}`} fluid />
    </Col>
    <Col xs={12} className="project-info">
      <Row>
        <Col xs={12} lg={4}>
          <ProjectPoints
            className="project-points-top"
            project={project}
          />
        </Col>
        <Col
          xs={12}
          lg={8}
          className="project-description"
          dangerouslySetInnerHTML={getProjectDescription(project)}
        />
      </Row>
    </Col>
  </Row>
);

TopView.propTypes = {
  project: PropTypes.shape({
    image: PropTypes.string.isRequired
  }).isRequired
};

export default TopView;
