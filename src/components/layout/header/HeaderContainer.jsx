import Logo from './Logo';
import Navbar from './Navbar';
import PageHeader from './PageHeader';

const HeaderContainer = ({ title, links }) => (
  <div>
    <Navbar links={links} />
    <Logo />
    <PageHeader title={title} />
  </div>
);

HeaderContainer.propTypes = {
  title: React.PropTypes.string.isRequired,
  links: React.PropTypes.arrayOf(
    React.PropTypes.shape({})
  ).isRequired
};

export default HeaderContainer;
