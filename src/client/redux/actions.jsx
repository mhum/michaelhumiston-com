export const SET_TITLE = 'SET_TITLE';
export const SET_DESCRIPTION = 'SET_DESCRIPTION';
export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const SEND_EMAIL = 'SEND_EMAIL';
export const RECEIVE_EMAIL = 'RECEIVE_EMAIL';
export const DISMISS_SUCCESS = 'DISMISS_SUCCESS';
export const DISMISS_ERROR = 'DISMISS_ERROR';
export const UPDATE_FIELD = 'UPDATE_FIELD';
export const UPDATE_FIELDS = 'UPDATE_FIELDS';

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

export function setPageDescription(text) {
  return { type: SET_DESCRIPTION, text };
}

export function getProjects() {
  return (dispatch) => {
    dispatch(requestProjects());
    return fetch('/api/projects')
      .then(response => response.json())
      .then(json => dispatch(receiveProjects(json)));
  };
}

export function sendEmail(details) {
  return (dispatch) => {
    dispatch(requestEmail(details));
    fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(details)
    })
      .then(response => dispatch(receiveEmail(response)));
  };
}

export function dismissSuccess() {
  return { type: DISMISS_SUCCESS };
}

export function dismissError() {
  return { type: DISMISS_ERROR };
}

export function updateField(name, value) {
  return { type: UPDATE_FIELD, name, value };
}

export function updateFields(fields) {
  return { type: UPDATE_FIELDS, fields };
}
