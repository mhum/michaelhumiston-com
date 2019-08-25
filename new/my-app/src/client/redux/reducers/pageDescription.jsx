import _merge from 'lodash/merge';

import { SET_DESCRIPTION } from '../actions';

const initialState = {
  description: ''
};

export default function pageDescription(state = initialState, action) {
  switch (action.type) {
    case SET_DESCRIPTION:
      document.getElementsByTagName('meta')[2].content = action.text;
      return _merge({}, state, {
        description: action.text
      });
    default:
      return state;
  }
}
