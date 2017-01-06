import { combineReducers } from 'redux';
import contact from './reducers/contact';
import pageTitle from './reducers/pageTitle';
import projects from './reducers/projects';

export default combineReducers({
  contact,
  pageTitle,
  projects
});
