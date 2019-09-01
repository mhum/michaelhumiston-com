import { SET_DESCRIPTION } from '../actions';

const initialState = {
  description: ''
};

export default function pageDescription(state = initialState, action) {
  switch (action.type) {
    case SET_DESCRIPTION:
      document.getElementsByTagName('meta')[3].content = action.text;
      return Object.assign({}, state, {
        description: action.text
      });
    default:
      return state;
  }
}
