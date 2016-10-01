import { Col, Row } from 'react-bootstrap';

const pageTitle = 'Projects';

class Projects extends React.Component {
  componentDidMount() {
    document.title = `${pageTitle} - Michael Humiston`;
  }

  render() {
    return (
      <Row>
        <Col>
          Projects go here!
        </Col>
      </Row>
    );
  }
}

Projects.title = pageTitle;

export default Projects;
