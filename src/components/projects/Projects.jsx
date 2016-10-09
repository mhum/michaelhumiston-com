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
            <Col xs={6} key={i} className="project-block" >
              <Link to={v.uri}>
                <div>
                  <h3>{v.name}</h3>
                  <p>{v.description}</p>
                  <Image src={`/assets/images/${v.image}`} responsive />
                </div>
              </Link>
            </Col>
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
