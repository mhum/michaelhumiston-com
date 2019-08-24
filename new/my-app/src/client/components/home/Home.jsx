import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import SocialLinks from './SocialLinks';

class Home extends React.Component {
  componentDidMount() {
    // const {
    //   pageTitle, pageDescription, setTitle, setDescription
    // } = this.props;
    // setTitle(pageTitle);
    // setDescription(pageDescription);
  }

  render() {
    return (
      <Row>
        <Col xs={12} md={4} className="home-link">
          <NavLink to="/projects">Projects</NavLink>
        </Col>
        <Col xs={12} md={4} className="home-link">
          <NavLink to="/about">About Me</NavLink>
        </Col>
        <Col xs={12} md={4} className="home-link">
          <NavLink to="/contact">Contact</NavLink>
        </Col>
        <Col xs={12}>
          <SocialLinks />
        </Col>
      </Row>
    );
  }
}

Home.defaultProps = {
  pageTitle: 'Home',
  pageDescription: 'Michael Humiston\'s personal home on the Internet',
  // setTitle: null,
  // setDescription: null
};

Home.propTypes = {
  pageTitle: PropTypes.string,
  pageDescription: PropTypes.string,
  // setTitle: PropTypes.func,
  // setDescription: PropTypes.func
};

export default Home;
