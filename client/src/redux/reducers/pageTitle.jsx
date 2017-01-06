import _merge from 'lodash/merge';

import { SET_TITLE } from '../actions';

const initialState = {
  title: 'Page Title'
};

export default function pageTitle(state = initialState, action) {
  switch (action.type) {
    case SET_TITLE:
      document.title = `${action.text} - Michael Humiston`;
      return _merge({}, state, {
        title: action.text
      });
    default:
      return state;
  }
}
