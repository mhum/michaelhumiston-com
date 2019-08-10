import PropTypes from 'prop-types';
import { Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router';

class Projects extends React.Component {
  componentDidMount() {
    const {
      children, pageTitle, pageDescription, setTitle, setDescription
    } = this.props;
    if (!children) {
      setTitle(pageTitle);
      setDescription(pageDescription);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      children, pageTitle, pageDescription, setTitle, setDescription
    } = this.props;
    if (!nextProps.children && children) {
      setTitle(pageTitle);
      setDescription(pageDescription);
    }
  }

  render() {
    const {
      children, projects, setTitle, setDescription
    } = this.props;
    return (
      <Row>
        {children
          ? React.cloneElement(children, {
            setTitle,
            setDescription,
            projects
          })
          : projects.map(v => (
            <Col xs={12} md={6} key={v.id} className="project-block">
              <Link href={v.uri} to={v.uri}>
                <div>
                  <h3>{v.name}</h3>
                  <p>{v.description}</p>
                  <Image src={`assets/images/${v.image}`} responsive />
                </div>
              </Link>
            </Col>
          ))
        }
      </Row>
    );
  }
}

Projects.defaultProps = {
  pageTitle: 'Projects',
  pageDescription: 'Michael Humiston\'s portfolio of personal projects',
  children: {},
  projects: [],
  setTitle: null,
  setDescription: null
};

Projects.propTypes = {
  children: PropTypes.shape({}),
  pageTitle: PropTypes.string,
  pageDescription: PropTypes.string,
  projects: PropTypes.arrayOf(PropTypes.object),
  setTitle: PropTypes.func,
  setDescription: PropTypes.func
};

export default Projects;
