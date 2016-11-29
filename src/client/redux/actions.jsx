export const SET_TITLE = 'SET_TITLE';
export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const SEND_EMAIL = 'SEND_EMAIL';
export const RECEIVE_EMAIL = 'RECEIVE_EMAIL';

function requestProjects() {
  return { type: FETCH_PROJECTS };
}

function receiveProjects(response) {
  return { type: RECEIVE_PROJECTS, response };
}

function requestEmail(details) {
  return { type: SEND_EMAIL, details };
}

function receiveEmail(response) {
  return { type: RECEIVE_EMAIL, response };
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

export function sendEmail(details) {
  return (dispatch) => {
    dispatch(requestEmail(details));
    fetch('/contact', {
      method: 'POST',
      body: JSON.stringify(details)
    })
    .then(response => dispatch(receiveEmail(response)));
  };
}
