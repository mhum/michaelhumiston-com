import _find from 'lodash/find';
import _merge from 'lodash/merge';

import { SEND_EMAIL, RECEIVE_EMAIL, DISMISS_SUCCESS, DISMISS_ERROR, UPDATE_FIELD, UPDATE_FIELDS } from '../actions';

const initialState = {
  isLoading: false,
  showSuccess: false,
  showError: false,
  fields: [
    {
      name: 'name',
      value: '',
      valid: true,
      errorMsg: ''
    },
    {
      name: 'email',
      value: '',
      valid: true,
      errorMsg: ''
    },
    {
      name: 'message',
      value: '',
      valid: true,
      errorMsg: ''
    },
    {
      name: 'captcha',
      value: '',
      valid: true,
      errorMsg: ''
    }
  ]
};

export default function counter(state = initialState, action) {
  switch (action.type) {
    case SEND_EMAIL:
      return _merge({}, state, {
        isLoading: true
      });
    case RECEIVE_EMAIL:
      if (action.response.ok) {
        const tempState = Object.assign({}, state);
        const { fields } = tempState;

        fields.forEach((field) => {
          field.value = '';
          field.valid = true;
          field.errorMsg = '';
        });

        return _merge({}, state, {
          isLoading: false,
          showSuccess: true,
          showError: false
        });
      }

      return _merge({}, state, {
        isLoading: false,
        showError: true
      });
    case DISMISS_SUCCESS:
      return _merge({}, state, {
        showSuccess: false
      });
    case DISMISS_ERROR:
      return _merge({}, state, {
        showError: false
      });
    case UPDATE_FIELD: {
      const tempState = Object.assign({}, state);
      const field = _find(tempState.fields, { name: action.name });
      field.value = action.value;

      return _merge({}, state, tempState);
    }
    case UPDATE_FIELDS: {
      const tempState = Object.assign({}, state);
      const { fields } = tempState;
      tempState.fields = _merge(fields, action.fields);

      return _merge({}, state, tempState);
    }
    default:
      return state;
  }
}
