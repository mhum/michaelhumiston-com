import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/App';
import Home from './components/home/Home';

import './less/styles.less';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
    </Route>
  </Router>
, document.getElementById('main'));
