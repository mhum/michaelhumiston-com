import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router';

import SocialLinks from './SocialLinks';

class Home extends React.Component {
  componentDidMount() {
    const { pageTitle, setTitle } = this.props;
    setTitle(pageTitle);
  }

  render() {
    return (
      <Row>
        <Col xs={12} md={4} className="home-link">
          <Link href="#projects" to="projects">Projects</Link>
        </Col>
        <Col xs={12} md={4} className="home-link">
          <Link href="#about" to="about">About Me</Link>
        </Col>
        <Col xs={12} md={4} className="home-link">
          <Link href="#contact" to="contact">Contact</Link>
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
  setTitle: null
};

Home.propTypes = {
  pageTitle: PropTypes.string,
  setTitle: PropTypes.func
};

export default Home;
