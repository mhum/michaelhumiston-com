import React from 'react';
// import 'babel-polyfill';
// import 'whatwg-fetch';

//import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import App from './App';
// import Contact from './contact/Contact';

// import Projects from './projects/Projects';
// import Project from './projects/Project';

// const Root = ({ store, history }) => (
//   <Provider store={store}>
//     <Router history={history}>
//       <Route path="/" component={App}>
//         <IndexRoute component={Home} />
//         <Route path="projects" component={Projects}>
//           <Route path="/projects/:projectName" component={Project} />
//         </Route>
//         <Route path="about" component={About} />
//         <Route path="contact" component={Contact} />
//       </Route>
//     </Router>
//   </Provider>
// );

const Root = () => (
    <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/about" component={App}/>
    </Switch>
);

// Root.propTypes = {
// history: PropTypes.shape({}).isRequired
// };

export default Root;
