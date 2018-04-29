import PropTypes from 'prop-types';
import { Col, Image, Row } from 'react-bootstrap';

class About extends React.Component {
  componentDidMount() {
    this.props.setTitle(this.props.pageTitle);
  }

  render() {
    return (
      <Row>
        <Col xs={12} sm={5} smPush={7}>
          <Image src="assets/images/about.jpg" responsive />
        </Col>
        <Col xs={12} sm={7} smPull={5}>
          <p>
            Information technology has been my calling for a long time. I was introduced to
            technology and the wider Internet at a young age through an old Packard Bell running
            Windows 3.1. What really lit the fire under me was receiving a <a href="http://en.wikipedia.org/wiki/Casio_BE-300" target="_blank" rel="noreferrer noopener">
            Casio BE-300
            </a> and being exposed to the immense possibilities that technology provided
            through software development, tinkering, and communities.
          </p>
          <p>
            Previously, I did enterprise <a href="http://en.wikipedia.org/wiki/Java_Platform,_Enterprise_Edition" target="_blank" rel="noreferrer noopener">
            Java
            </a> web development using a variety of technologies such as <a href="http://spring.io/" target="_blank" rel="noreferrer noopener">Spring</a>
            , <a href="http://grails.org/" target="_blank" rel="noreferrer noopener">Grails</a>,
            and <a href="http://www.sencha.com/products/extjs/" target="_blank" rel="noreferrer noopener">ExtJS</a> for internal projects.
          </p>
          <p>
            I also worked as a consultant developing online gambling and betting software.
            There, I used a wide-variety of tools and technologies doing everything from
            requirements analysis to live deployments on a high volume software stack. I developed
            in languages such as <a href="https://tcl.tk" target="_blank" rel="noreferrer noopener">Tcl</a>
            , <a href="https://www.ruby-lang.org/en" target="_blank" rel="noreferrer noopener">Ruby</a>
            , <a href="http://www.java.com/en" target="_blank" rel="noreferrer noopener">Java</a>,
            and <a href="https://en.wikipedia.org/wiki/JavaScript" target="_blank" rel="noreferrer noopener">JavaScript</a> using
            frameworks such as <a href="https://facebook.github.io/react/" target="_blank" rel="noreferrer noopener">React</a>
            , <a href="https://angularjs.org/" target="_blank" rel="noreferrer noopener">Angular</a>
            , and <a href="http://spring.io/" target="_blank" rel="noreferrer noopener">Spring</a>.
          </p>
        </Col>
      </Row>
    );
  }
}

About.defaultProps = {
  setTitle: null
};

About.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  setTitle: PropTypes.func
};

export default About;
