import { Grid } from 'react-bootstrap';

import HeaderContainer from './layout/header/HeaderContainer';
import HomeBody from './home/HomeBody';

const Home = () =>
  <Grid id="container">
    <HeaderContainer />
    <HomeBody />
  </Grid>;

export default Home;
