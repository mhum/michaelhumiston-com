import 'babel-polyfill';
import 'whatwg-fetch';

import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import App from './App';
import About from './about/About';
import Contact from './contact/Contact';
import Home from './home/Home';
import Projects from './projects/Projects';
import Project from './projects/Project';

const Root = ({ store, history }) => (
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
);

export default Root;
