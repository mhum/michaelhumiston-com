import 'babel-polyfill';
import 'whatwg-fetch';

import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import reducers from './redux/reducers';
import App from './components/App';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Home from './components/home/Home';
import Projects from './components/projects/Projects';
import Project from './components/projects/Project';

import './less/styles.less';

const store = createStore(
  combineReducers({
    reducers,
    routing: routerReducer
  })
);

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="projects" component={Projects}>
          <Route path="/projects/:projectName" component={Project} />
        </Route>
        <Route path="about" component={About} />
        <Route path="contact" component={Contact} />
      </Route>
    </Router>
  </Provider>
, document.getElementById('main'));
