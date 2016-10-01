import Logo from './Logo';
import Navbar from './Navbar';
import PageHeader from './PageHeader';

const HeaderContainer = ({ routes, params }) => (
  <div>
    <Navbar />
    <Logo />
    <PageHeader routes={routes} params={params} />
  </div>
);

HeaderContainer.propTypes = {
  routes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  params: React.PropTypes.shape({}).isRequired
};

export default HeaderContainer;
