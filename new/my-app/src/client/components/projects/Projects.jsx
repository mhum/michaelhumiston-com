import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

import { PAGE_DESCRIPTIONS, PAGE_TITLES } from '../../constants/pageInfo';
import { reportPageview } from '../../utils/ga';

class Projects extends React.Component {
  componentDidMount() {
    const {
      pageTitle, pageDescription, setTitle, setDescription
    } = this.props;
    setTitle(pageTitle);
    setDescription(pageDescription);
    reportPageview();
  }

  render() {
    const {  projects } = this.props;
    return (
      <Row>
        {
          projects && projects.map(v => (
              <Col xs={12} md={6} key={v.id} className="project-block">
                <Link href={v.uri} to={v.uri}>
                  <div>
                    <h3>{v.name}</h3>
                    <p>{v.description}</p>
                    <Image src={`assets/images/${v.image}`} fluid />
                  </div>
                </Link>
              </Col>
            ))
        }
      </Row>
    );
  }
}

Projects.defaultProps = {
  pageTitle: PAGE_TITLES.projects,
  pageDescription: PAGE_DESCRIPTIONS.projects,
  projects: [],
  setTitle: null,
  setDescription: null
};

Projects.propTypes = {
  pageTitle: PropTypes.string,
  pageDescription: PropTypes.string,
  projects: PropTypes.arrayOf(PropTypes.object),
  setTitle: PropTypes.func,
  setDescription: PropTypes.func
};

export default Projects;
