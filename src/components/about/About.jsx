import { Col, Image, Row } from 'react-bootstrap';

const pageTitle = 'About Me';

class About extends React.Component {
  componentDidMount() {
    document.title = `${pageTitle} - Michael Humiston`;
  }

  render() {
    return (
      <Row>
        <Col xs={3}>
          <Image src="/assets/images/main.jpg" responsive />
        </Col>
        <Col xs={9}>
          <p>
            Information technology is my calling. I was introduced to technology and the wider
            Internet at a young age through an old Packard Bell running Windows 3.1. What really lit
            the fire under me was receiving a <a href="http://en.wikipedia.org/wiki/Casio_BE-300">
            Casio BE-300</a> and being exposed to the immense possibilities that technology provided
            through software development, tinkering, and communities.
          </p>
          <p>
            Previously, did enterprise <a href="http://en.wikipedia.org/wiki/Java_Platform,_Enterprise_Edition">
            Java</a> web development using a variety of technologies such as <a href="http://spring.io/">Spring</a>
            , <a href="http://hibernate.org/">Hibernate</a>, <a href="http://grails.org/">Grails</a>,
            and <a href="http://www.sencha.com/products/extjs/">ExtJS</a> for internal projects. Now, I
            work as a consultant developing online gambling and betting software.
          </p>
          <p>
            My interests have developed a long way since the days of dial-up and PDAs and include
            things such as information security, network design, systems integration, and network
            administration. I love learning new technologies and ways of doing things. I am
            constantly trying to do new things to improve my skills and broaden my horizons. This
            website is about my musings, personal interests, and projects.
          </p>
        </Col>
      </Row>
    );
  }
}

About.title = pageTitle;

export default About;
