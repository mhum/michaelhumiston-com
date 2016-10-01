import { Col, Image, Row } from 'react-bootstrap';

import SocialLinks from './SocialLinks';

const pageTitle = 'Home';

class Home extends React.Component {
  componentDidMount() {
    document.title = `${pageTitle} - Michael Humiston`;
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

Home.title = pageTitle;

export default Home;
