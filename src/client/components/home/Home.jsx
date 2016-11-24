import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router';

import SocialLinks from './SocialLinks';

class Home extends React.Component {
  componentDidMount() {
    this.props.setTitle(this.props.pageTitle);
  }

  render() {
    return (
      <Row>
        <Col xs={12} md={4} className="home-link">
          <Link to="projects">Projects</Link>
        </Col>
        <Col xs={12} md={4} className="home-link">
          <Link to="about">About Me</Link>
        </Col>
        <Col xs={12} md={4} className="home-link">
          <Link to="contact">Contact</Link>
        </Col>
        <Col xs={12}>
          <SocialLinks />
        </Col>
      </Row>
    );
  }
}

Home.defaultProps = {
  pageTitle: 'Home'
};

Home.propTypes = {
  pageTitle: React.PropTypes.string.isRequired,
  setTitle: React.PropTypes.func
};

export default Home;
