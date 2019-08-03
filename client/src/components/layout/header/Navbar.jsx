import PropTypes from 'prop-types';
import {
  MenuItem, Nav, Navbar, NavDropdown, NavItem
} from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

const generateSubMenu = ((link, i, LinkClass, expanded, onClickLink, projects) => (
  <LinkContainer to={link.uri} key={i}>
    <NavDropdown
      eventKey={i}
      title={link.name}
      id="basic-nav-dropdown"
      noCaret
      open={expanded}
      onToggle={onClickLink}
    >
      {
          projects && projects.map((v, ii) => (
            <LinkClass to={v.uri} key={v.id}>
              <MenuItem eventKey={`${i}.${ii}`}>{v.name}</MenuItem>
            </LinkClass>
          ))
        }
    </NavDropdown>
  </LinkContainer>
)
);

const generateLink = ((link, i, expanded, onClickLink, projects) => {
  const LinkClass = link.isIndex ? IndexLinkContainer : LinkContainer;

  if (link.hasSubMenu) {
    return generateSubMenu(link, i, LinkClass, expanded, onClickLink, projects);
  }

  return (
    <LinkClass to={link.uri} key={i}>
      <NavItem eventKey={i}>{link.name}</NavItem>
    </LinkClass>
  );
});

class Navmenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };

    this.onClickLink = this.onClickLink.bind(this);
  }

  onClickLink() {
    this.setState({
      expanded: false
    });
  }

  render() {
    const { links, projects } = this.props;
    const { expanded } = this.state;
    return (
      <Navbar id="navbar">
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {
              links.map((v, i) => generateLink(v, i, expanded, this.onClickLink, projects))
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Navmenu.defaultProps = {
  projects: []
};

Navmenu.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({}))
};

export default Navmenu;
