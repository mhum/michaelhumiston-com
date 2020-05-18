import {
  SEND_EMAIL, RECEIVE_EMAIL_ERROR, RECEIVE_EMAIL_SUCCESS, DISMISS_SUCCESS, DISMISS_ERROR, UPDATE_FIELD, UPDATE_FIELDS
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

export default function contact(state = initialState, action) {
  switch (action.type) {
    case SEND_EMAIL: {
      const tempState = { ...state };
      const { fields } = tempState;

      fields.forEach((field) => {
        field.valid = true;
      });
      return { ...state, isLoading: true };
    }
    case RECEIVE_EMAIL_SUCCESS: {
      const tempState = { ...state };
      const { fields } = tempState;

      fields.forEach((field) => {
        field.value = '';
        field.errorMsg = '';
      });

      return {
        ...state,
        isLoading: false,
        showSuccess: true,
        showError: false
      };
    }
    case RECEIVE_EMAIL_ERROR: {
      const tempState = { ...state };
      const { fields } = tempState;

      if (action.response.status === 400 && action.json.type === 'validation_failed') {
        action.json.errors.forEach((error) => {
          const field = fields.find((f) => f.name === error.field);
          field.errorMsg = error.message;
          field.valid = false;
        });

        return {
          ...state,
          isLoading: false,
          showError: false
        };
      }

      return {
        ...state,
        isLoading: false,
        showError: true
      };
    }
    case DISMISS_SUCCESS: {
      return { ...state, showSuccess: false };
    }
    case DISMISS_ERROR: {
      return { ...state, showError: false };
    }
    case UPDATE_FIELD: {
      const tempState = { ...state };
      const field = tempState.fields.find((tempField) => tempField.name === action.name);
      field.value = action.value;

      return { ...state, ...tempState };
    }
    case UPDATE_FIELDS: {
      const tempState = { ...state };
      const { fields } = tempState;
      tempState.fields = Object.assign(fields, action.fields);

      return { ...state, ...tempState };
    }
    default:
      return state;
  }
}
