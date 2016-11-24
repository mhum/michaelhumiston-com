export const SET_TITLE = 'SET_TITLE';
export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';

function requestProjects() {
  return { type: FETCH_PROJECTS };
}

function receiveProjects(response) {
  return { type: RECEIVE_PROJECTS, response };
}

export function setPageTitle(text) {
  return { type: SET_TITLE, text };
}

export function getProjects() {
  return (dispatch) => {
    dispatch(requestProjects());
    return fetch('/projects')
      .then(response => response.json())
      .then(json => dispatch(receiveProjects(json)));
  };
}
