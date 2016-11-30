import { SET_TITLE, FETCH_PROJECTS, RECEIVE_PROJECTS,
  SEND_EMAIL, RECEIVE_EMAIL, DISMISS_SUCCESS, DISMISS_ERROR } from './actions';

const initialState = {
  pageTitle: 'Page Title',
  projects: {
    list: [],
    fetching: false
  },
  contact: {
    isLoading: false,
    showSuccess: false,
    showError: false
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
    case SEND_EMAIL:
      return Object.assign({}, state, {
        contact: {
          isLoading: true
        }
      });
    case RECEIVE_EMAIL:
      if (action.response.ok) {
        return Object.assign({}, state, {
          contact: {
            isLoading: false,
            showSuccess: true
          }
        });
      }

      return Object.assign({}, state, {
        contact: {
          isLoading: false,
          showError: true
        }
      });
    case DISMISS_SUCCESS:
      return Object.assign({}, state, {
        contact: {
          showSuccess: false
        }
      });
    case DISMISS_ERROR:
      return Object.assign({}, state, {
        contact: {
          showError: false
        }
      });
    default:
      return state;
  }
}

export default reduce;
