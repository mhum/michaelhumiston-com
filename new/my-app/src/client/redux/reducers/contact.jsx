import {
  SEND_EMAIL, RECEIVE_EMAIL, DISMISS_SUCCESS, DISMISS_ERROR, UPDATE_FIELD, UPDATE_FIELDS
} from '../actions';

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
        const tempState = Object.assign({}, state);
        const { fields } = tempState;

        fields.forEach((field) => {
          field.valid = true;
        });
      return Object.assign({}, state, {
        isLoading: true
      });
    case RECEIVE_EMAIL:
      if (action.response.ok) {
        const tempState = Object.assign({}, state);
        const { fields } = tempState;

        fields.forEach((field) => {
          field.value = '';
          field.errorMsg = '';
        });

        return Object.assign({}, state, {
          isLoading: false,
          showSuccess: true,
          showError: false
        });
      }

      return Object.assign({}, state, {
        isLoading: false,
        showError: true
      });
    case DISMISS_SUCCESS:
      return Object.assign({}, state, {
        showSuccess: false
      });
    case DISMISS_ERROR:
      return Object.assign({}, state, {
        showError: false
      });
    case UPDATE_FIELD: {
      const tempState = Object.assign({}, state);
      const field = tempState.fields.find(field => field.name === action.name);
      field.value = action.value;

      return Object.assign({}, state, tempState);
    }
    case UPDATE_FIELDS: {
      const tempState = Object.assign({}, state);
      const { fields } = tempState;
      tempState.fields = Object.assign(fields, action.fields);

      return Object.assign({}, state, tempState);
    }
    default:
      return state;
  }
}
