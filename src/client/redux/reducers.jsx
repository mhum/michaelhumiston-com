import { SET_TITLE, FETCH_PROJECTS, RECEIVE_PROJECTS } from './actions';

const initialState = {
  pageTitle: 'Page Title',
  projects: {
    list: [],
    fetching: false
  }
};

function reduce(state = initialState, action) {
  switch (action.type) {
    case SET_TITLE:
      document.title = `${action.text} - Michael Humiston`;
      return Object.assign({}, state, {
        pageTitle: action.text
      });
    case FETCH_PROJECTS:
      return Object.assign({}, state, {
        projects: {
          list: [],
          fetching: true
        }
      });
    case RECEIVE_PROJECTS:
      return Object.assign({}, state, {
        projects: {
          list: action.response.projects,
          fetching: false
        }
      });
    default:
      return state;
  }
}

export default reduce;
