import { combineReducers } from 'redux';
import contact from './reducers/contact';
import pageDescription from './reducers/pageDescription';
import pageTitle from './reducers/pageTitle';
import projects from './reducers/projects';

export default combineReducers({
  contact,
  pageDescription,
  pageTitle,
  projects
});
