import { Grid } from 'react-bootstrap';

import HeaderContainer from './layout/header/HeaderContainer';
import SocialLinks from './home/SocialLinks';

const Home = () =>
  <Grid id="container">
    <HeaderContainer />
    <SocialLinks />
  </Grid>;

export default Home;
