import Logo from './Logo';
import Navbar from './Navbar';
import PageHeader from './PageHeader';

const HeaderContainer = ({ title, links, projects }) => (
  <div>
    <Navbar links={links} projects={projects} />
    <Logo />
    <PageHeader title={title} />
  </div>
);

HeaderContainer.propTypes = {
  title: React.PropTypes.string,
  links: React.PropTypes.arrayOf(
    React.PropTypes.shape({})
  ).isRequired,
  projects: React.PropTypes.arrayOf(
    React.PropTypes.shape({})
  )
};

export default HeaderContainer;
