import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const generateSubMenu = ((link, idx, expanded, onClickLink, projects) => (
    <NavDropdown
      title={link.name}
      id="nav-dropdown"
      active={expanded}
      onToggle={onClickLink}
      key={idx}
    >
      <NavDropdown.Item to={link.uri} eventKey={`${idx}`} as={Link}>
          All
      </NavDropdown.Item>
      <NavDropdown.Divider />
      {
        projects && projects.map((v, ii) => (
          <NavDropdown.Item to={v.uri} key={v.id} eventKey={`${idx}.${ii}`} as={Link}>
              {v.name}
          </NavDropdown.Item> 
        ))
      }
    </NavDropdown>
)
);

const generateLink = ((link, idx, expanded, onClickLink, projects) => {
  if (link.hasSubMenu) {
    return generateSubMenu(link, idx, expanded, onClickLink, projects);
  }

  return ( 
    <Nav.Link to={link.uri} as={Link} key={idx} className="nav-link">
      {link.name}
    </Nav.Link>
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
      <Navbar id="navbar" expand="md" collapseOnSelect> 
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {
              links.map((link, idx) => generateLink(link, idx, expanded, this.onClickLink, projects))
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
