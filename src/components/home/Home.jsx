import { Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router';

import SocialLinks from './SocialLinks';

class Home extends React.Component {
  componentDidMount() {
    this.props.setTitle(this.props.pageTitle);
  }

  render() {
    return (
      <Row>
        <Col xs={7}>
          <Image src="/assets/images/springbrook.jpg" responsive />
        </Col>
        <Col xs={5}>
          <div className="home-links">
            <div>
              <Link to="projects">Projects</Link>
            </div>
            <div>
              <Link to="about">About Me</Link>
            </div>
            <div>
              <Link to="contact">Contact</Link>
            </div>
          </div>
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
