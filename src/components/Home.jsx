import { Grid } from 'react-bootstrap';

import Header from './layout/Header';
import SocialLinks from './home/SocialLinks';

const Home = () =>
  <Grid>
    <Header />
    <h3>Hello, world</h3>
    <SocialLinks />
  </Grid>;

export default Home;
