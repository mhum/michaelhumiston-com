import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

const Navmenu = () => (
  <Navbar id="navbar">
    <Navbar.Header>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <IndexLinkContainer to="/">
          <NavItem eventKey={1}>Home</NavItem>
        </IndexLinkContainer>
        <LinkContainer to="about">
          <NavItem eventKey={2}>About</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Navmenu;
