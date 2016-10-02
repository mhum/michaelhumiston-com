import { MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

const generateSubMenu = ((link, i, LinkClass, expanded, onClickLink) =>
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
        link.items.map((v, ii) =>
          <LinkClass to={v.uri} key={ii}>
            <MenuItem eventKey={`${i}.${ii}`}>{v.name}</MenuItem>
          </LinkClass>
        )
      }
    </NavDropdown>
  </LinkContainer>
);

const generateLink = ((link, i, expanded, onClickLink) => {
  const LinkClass = link.isIndex ? IndexLinkContainer : LinkContainer;

  if (link.hasSubMenu) {
    return generateSubMenu(link, i, LinkClass, expanded, onClickLink);
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
    return (
      <Navbar id="navbar">
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {
              this.props.links.map((v, i) =>
                generateLink(v, i, this.state.expanded, this.onClickLink)
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Navmenu.propTypes = {
  links: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

export default Navmenu;
