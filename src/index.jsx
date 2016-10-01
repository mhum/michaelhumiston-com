import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/App';
import About from './components/about/About';
import Home from './components/home/Home';

import './less/styles.less';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route name="Home" path="/" component={App}>
      <IndexRoute component={Home} />
      <Route name="About Me" path="about" component={About} />
    </Route>
  </Router>
, document.getElementById('main'));
