import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

const generateLink = ((link, i) => {
  const LinkClass = link.isIndex ? IndexLinkContainer : LinkContainer;
  return (
    <LinkClass to={link.uri} key={i}>
      <NavItem eventKey={i}>{link.name}</NavItem>
    </LinkClass>
  );
});

const Navmenu = ({ links }) => (
  <Navbar id="navbar">
    <Navbar.Header>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        {
          links.map((v, i) =>
            generateLink(v, i)
          )
        }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

Navmenu.propTypes = {
  links: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

Navmenu.defaultProps =
{
  links: [
    {
      uri: '/',
      name: 'Home',
      isIndex: true
    }, {
      uri: 'projects',
      name: 'Projects',
      isIndex: false
    }, {
      uri: 'about',
      name: 'About',
      isIndex: false
    }
  ]
};

export default Navmenu;
