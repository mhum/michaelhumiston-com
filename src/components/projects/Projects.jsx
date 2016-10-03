import { Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router';

class Projects extends React.Component {
  componentDidMount() {
    this.props.setTitle(this.props.pageTitle);
  }

  render() {
    const projects = this.props.projects;
    return (
      <Row>
        {
          projects.map((v, i) =>
            <Link to={v.uri} key={i}>
              <Col xs={6} className="project-block" >
                <h3>{v.name}</h3>
                <p>{v.description}</p>
                <Image src={`/assets/images/${v.image}`} responsive />
              </Col>
            </Link>
          )
        }
      </Row>
    );
  }
}

Projects.defaultProps = {
  pageTitle: 'Projects'
};

Projects.propTypes = {
  pageTitle: React.PropTypes.string.isRequired,
  projects: React.PropTypes.arrayOf(React.PropTypes.object),
  setTitle: React.PropTypes.func
};

export default Projects;
