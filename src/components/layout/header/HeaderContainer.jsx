import Logo from './Logo';
import Navbar from './Navbar';
import PageHeader from './PageHeader';

const HeaderContainer = ({ title }) => (
  <div>
    <Navbar />
    <Logo />
    <PageHeader title={title} />
  </div>
);

HeaderContainer.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default HeaderContainer;
