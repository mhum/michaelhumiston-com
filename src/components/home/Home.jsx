import { Col, Image, Row } from 'react-bootstrap';

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
          <p>
            Thanks for stopping by my personal website. Links to some of my social media offerings
            can be found below.
          </p>
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
