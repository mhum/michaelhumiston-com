import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/App';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Home from './components/home/Home';
import Projects from './components/projects/Projects';
import Project from './components/projects/Project';

import './less/styles.less';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="projects" component={Projects}>
        <Route path="/projects/:projectName" component={Project} />
      </Route>
      <Route path="about" component={About} />
      <Route path="contact" component={Contact} />
    </Route>
  </Router>
, document.getElementById('main'));
