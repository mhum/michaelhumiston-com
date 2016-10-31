import { SET_TITLE } from './actions';

const initialState = {
  pageTitle: 'Page Title'
};

function reduce(state = initialState, action) {
  switch (action.type) {
    case SET_TITLE:
      document.title = `${action.text} - Michael Humiston`;
      return Object.assign({}, state, {
        pageTitle: action.text
      });
    default:
      return state;
  }
}

export default reduce;
