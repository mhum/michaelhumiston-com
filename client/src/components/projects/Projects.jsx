import PropTypes from 'prop-types';
import { Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router';

class Projects extends React.Component {
  componentDidMount() {
    if (!this.props.children) {
      this.props.setTitle(this.props.pageTitle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.children && this.props.children) {
      this.props.setTitle(this.props.pageTitle);
    }
  }

  render() {
    const { projects } = this.props;
    return (
      <Row>
        {this.props.children ?
          React.cloneElement(this.props.children, {
            setTitle: this.props.setTitle,
            projects: this.props.projects
          }) :
          projects.map(v =>
            (
              <Col xs={12} md={6} key={v.id} className="project-block" >
                <Link href={v.uri} to={v.uri}>
                  <div>
                    <h3>{v.name}</h3>
                    <p>{v.description}</p>
                    <Image src={`assets/images/${v.image}`} responsive />
                  </div>
                </Link>
              </Col>))
        }
      </Row>
    );
  }
}

Projects.defaultProps = {
  pageTitle: 'Projects',
  children: {},
  projects: [],
  setTitle: null
};

Projects.propTypes = {
  children: PropTypes.shape({}),
  pageTitle: PropTypes.string,
  projects: PropTypes.arrayOf(PropTypes.object),
  setTitle: PropTypes.func
};

export default Projects;
