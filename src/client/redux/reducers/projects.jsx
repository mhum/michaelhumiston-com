import { FETCH_PROJECTS, RECEIVE_PROJECTS } from '../actions';

const initialState = {
  list: [],
  fetching: false
};

export default function projects(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROJECTS:
      return Object.assign({}, state, {
        list: [],
        fetching: true
      });
    case RECEIVE_PROJECTS:
      return Object.assign({}, state, {
        list: action.response.projects,
        fetching: false
      });
    default:
      return state;
  }
}
