import _find from 'lodash/find';
import _merge from 'lodash/merge';

import { SET_TITLE, FETCH_PROJECTS, RECEIVE_PROJECTS, SEND_EMAIL, RECEIVE_EMAIL, DISMISS_SUCCESS,
  DISMISS_ERROR, UPDATE_FIELD } from './actions';

const initialState = {
  pageTitle: 'Page Title',
  projects: {
    list: [],
    fetching: false
  },
  contact: {
    isLoading: false,
    showSuccess: false,
    showError: false,
    fields: [
      {
        name: 'name',
        value: '',
        valid: true,
        errorMsg: ''
      },
      {
        name: 'email',
        value: '',
        valid: true,
        errorMsg: ''
      },
      {
        name: 'message',
        value: '',
        valid: true,
        errorMsg: ''
      }
    ]
  }
};

function reduce(state = initialState, action) {
  switch (action.type) {
    case SET_TITLE:
      document.title = `${action.text} - Michael Humiston`;
      return _merge({}, state, {
        pageTitle: action.text
      });
    case FETCH_PROJECTS:
      return _merge({}, state, {
        projects: {
          list: [],
          fetching: true
        }
      });
    case RECEIVE_PROJECTS:
      return _merge({}, state, {
        projects: {
          list: action.response.projects,
          fetching: false
        }
      });
    case SEND_EMAIL:
      return _merge({}, state, {
        contact: {
          isLoading: true
        }
      });
    case RECEIVE_EMAIL:
      if (action.response.ok) {
        return _merge({}, state, {
          contact: {
            isLoading: false,
            showSuccess: true
          }
        });
      }

      return _merge({}, state, {
        contact: {
          isLoading: false,
          showError: true
        }
      });
    case DISMISS_SUCCESS:
      return _merge({}, state, {
        contact: {
          showSuccess: false
        }
      });
    case DISMISS_ERROR:
      return _merge({}, state, {
        contact: {
          showError: false
        }
      });
    case UPDATE_FIELD: {
      const tempState = Object.assign({}, state);
      const field = _find(tempState.contact.fields, { name: action.event.target.name });
      field.value = action.event.target.value;

      return _merge({}, state, tempState);
    }
    default:
      return state;
  }
}

export default reduce;
