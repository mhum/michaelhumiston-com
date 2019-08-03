import PropTypes from 'prop-types';
import { Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router';

class Projects extends React.Component {
  componentDidMount() {
    const { children, pageTitle, setTitle } = this.props;
    if (!children) {
      setTitle(pageTitle);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { children, pageTitle, setTitle } = this.props;
    if (!nextProps.children && children) {
      setTitle(pageTitle);
    }
  }

  render() {
    const { children, projects, setTitle } = this.props;
    return (
      <Row>
        {children
          ? React.cloneElement(children, {
            setTitle,
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
