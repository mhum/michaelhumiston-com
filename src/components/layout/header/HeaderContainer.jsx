import Logo from './Logo';
import Navbar from './Navbar';
import PageHeader from './PageHeader';

const HeaderContainer = () => (
  <div>
    <Navbar />
    <Logo />
    <PageHeader page="Home" />
  </div>
);

export default HeaderContainer;
