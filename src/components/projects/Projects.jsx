import { Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router';

class Projects extends React.Component {
  componentDidMount() {
    if (!this.props.children) {
      this.props.setTitle(this.props.pageTitle);
    }
  }

  render() {
    const projects = this.props.projects;
    return (
      <Row>
        {this.props.children ?
          React.cloneElement(this.props.children, {
            setTitle: this.props.setTitle,
            projects: this.props.projects
          }) :
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
  children: React.PropTypes.shape({}),
  pageTitle: React.PropTypes.string.isRequired,
  projects: React.PropTypes.arrayOf(React.PropTypes.object),
  setTitle: React.PropTypes.func
};

export default Projects;
