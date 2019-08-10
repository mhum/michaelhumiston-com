import _merge from 'lodash/merge';

import { SET_TITLE } from '../actions';

const initialState = {
  title: 'Page Title'
};

export default function pageTitle(state = initialState, action) {
  switch (action.type) {
    case SET_TITLE:
      if (action.text === 'Home') {
        document.title = 'Michael Humiston';
      } else {
        document.title = `Michael Humiston | ${action.text}`;
      }
      return _merge({}, state, {
        title: action.text
      });
    default:
      return state;
  }
}
