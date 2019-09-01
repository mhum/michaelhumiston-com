import { SET_TITLE } from '../actions';

const initialState = {
  title: ''
};

export default function pageTitle(state = initialState, action) {
  switch (action.type) {
    case SET_TITLE:
      if (action.text === 'Home') {
        document.title = 'Michael Humiston';
      } else {
        document.title = `Michael Humiston | ${action.text}`;
      }
      return Object.assign({}, state, {
        title: action.text
      });
    default:
      return state;
  }
}
