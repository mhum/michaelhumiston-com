import { Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Navmenu = () => (
  <Navbar id="navbar">
    <Navbar.Header>
      <LinkContainer to={{ pathname: '/' }}>
        <Navbar.Link>Home</Navbar.Link>
      </LinkContainer>
      <LinkContainer to={{ pathname: '/about' }}>
        <Navbar.Link>About</Navbar.Link>
      </LinkContainer>
      <Navbar.Toggle />
    </Navbar.Header>
  </Navbar>
);

export default Navmenu;
