import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import ReCAPTCHA from 'react-google-recaptcha';
import { connect } from 'react-redux';
import validate from 'validate.js';

import { PAGE_DESCRIPTIONS, PAGE_TITLES } from '../../constants/pageInfo';
import reportPageview from '../../utils/ga';
import {
  sendEmail, dismissSuccess, dismissError, updateField, updateFields
} from '../../redux/actions';

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.onDismissSuccess = this.onDismissSuccess.bind(this);
    this.onDismissError = this.onDismissError.bind(this);
    this.onSubmitCaptcha = this.onSubmitCaptcha.bind(this);
    this.getField = this.getField.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.recaptchaRef = React.createRef();
  }

  componentDidMount() {
    const {
      pageTitle, pageDescription, setTitle, setDescription
    } = this.props;
    setTitle(pageTitle);
    setDescription(pageDescription);
    reportPageview();
  }

  onSubmitCaptcha(resp) {
    const { updateContactField } = this.props;
    updateContactField('captcha', resp);
  }

  onDismissSuccess() {
    const { dismissContactSuccess } = this.props;
    dismissContactSuccess();
  }

  onDismissError() {
    const { dismissContactError } = this.props;
    dismissContactError();
  }

  getField(name) {
    const { contact } = this.props;
    return contact.fields.find(field => field.name === name);
  }

  validateForm() {
    const { contact, updateContactFields } = this.props;
    let valid = false;

    const { fields } = contact;
    const constraints = {
      name: {
        presence: {
          allowEmpty: false
        }
      },
      email: {
        presence: {
          allowEmpty: false
        },
        email: true
      },
      message: {
        presence: {
          allowEmpty: false
        }
      },
      captcha: {
        presence: {
          allowEmpty: false
        }
      }
    };

    const errors = validate({
      name: this.getField('name').value,
      email: this.getField('email').value,
      message: this.getField('message').value,
      captcha: this.getField('captcha').value
    }, constraints);

    if (errors) {
      fields.forEach((field) => {
        const f = this.getField(field.name);
        if (errors[field.name]) {
          f.valid = false;
          [f.errorMsg] = errors[field.name];
        } else {
          f.valid = true;
          f.errorMsg = '';
        }
      });
    } else {
      valid = true;
    }

    updateContactFields(fields);

    return valid;
  }

  submitForm() {
    const { submitContact } = this.props;
    if (!this.validateForm()) {
      return false;
    }

    const details = {
      name: this.getField('name').value,
      email: this.getField('email').value,
      message: this.getField('message').value,
      captcha: this.getField('captcha').value
    };

    submitContact(details);
    this.recaptchaRef.current.reset();

    return true;
  }

  handleChange(event) {
    const { updateContactField } = this.props;
    updateContactField(event.target.name, event.target.value);
  }

  render() {
    const { contact } = this.props;
    if (!contact.fields) {
      return (
        <Row />
      );
    }

    const name = this.getField('name');
    const email = this.getField('email');
    const message = this.getField('message');
    const captcha = this.getField('captcha');

    return (
      <Row>
        <Col sm={{ span: 11, offset: 1 }}>
          <Alert
            variant="success"
            dismissible
            show={contact.showSuccess}
            onClose={this.onDismissSuccess}
          >
            <strong>Thanks! Message successfully sent.</strong>
          </Alert>

          <Alert
            variant="danger"
            dismissible
            show={contact.showError}
            onClose={this.onDismissError}
          >
            <strong>There was a problem sending the message...</strong>
          </Alert>

          <Form>
            <Form.Group as={Row} controlId="nameField">
              <Form.Label column sm={2}>Name</Form.Label>
              <Col sm={5}>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Name (Required)"
                  value={name.value}
                  onChange={this.handleChange}
                  isInvalid={!name.valid}
                />
                <Form.Control.Feedback type="invalid">{name.errorMsg}</Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="emailField">
              <Form.Label column sm={2}>Email</Form.Label>
              <Col sm={5}>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Email (Required)"
                  value={email.value}
                  onChange={this.handleChange}
                  isInvalid={!email.valid}
                />
                <Form.Control.Feedback type="invalid">{email.errorMsg}</Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="messageField">
              <Form.Label column sm={2}>Message</Form.Label>
              <Col sm={5}>
                <Form.Control
                  name="message"
                  as="textarea"
                  rows={3}
                  placeholder="Message (Required)"
                  value={message.value}
                  onChange={this.handleChange}
                  isInvalid={!message.valid}
                />
                <Form.Control.Feedback type="invalid">{message.errorMsg}</Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formCaptcha">
              <Col sm={{ span: 10, offset: 2 }}>
                <ReCAPTCHA
                  ref={this.recaptchaRef}
                  sitekey="6LeKIg0TAAAAACb_BCdlKpcG9__3g-2uremLfZym"
                  onChange={this.onSubmitCaptcha}
                />
                {captcha.valid ? null : (
                  <div className="captcha-feedback">
                    {' '}
                    {captcha.errorMsg}
                  </div>
                )}
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>
                <Button
                  disabled={contact.isLoading}
                  onClick={!contact.isLoading ? this.submitForm : null}
                >
                  {contact.isLoading ? 'Submitting...' : 'Submit'}
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    );
  }
}

Contact.defaultProps = {
  pageTitle: PAGE_TITLES.contact,
  pageDescription: PAGE_DESCRIPTIONS.contact
};

Contact.propTypes = {
  contact: PropTypes.shape({
    isLoading: PropTypes.bool,
    showError: PropTypes.bool,
    showSuccess: PropTypes.bool,
    captcha: PropTypes.string,
    fields: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
  pageTitle: PropTypes.string,
  pageDescription: PropTypes.string,
  setTitle: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  submitContact: PropTypes.func.isRequired,
  dismissContactSuccess: PropTypes.func.isRequired,
  dismissContactError: PropTypes.func.isRequired,
  updateContactField: PropTypes.func.isRequired,
  updateContactFields: PropTypes.func.isRequired
};

const mapStateToProps = state => (
  {
    contact: state.reducers.contact
  }
);

const mapDispatchToProps = dispatch => (
  {
    submitContact: (details) => {
      dispatch(sendEmail(details));
    },
    dismissContactSuccess: () => {
      dispatch(dismissSuccess());
    },
    dismissContactError: () => {
      dispatch(dismissError());
    },
    updateContactField: (name, value) => {
      dispatch(updateField(name, value));
    },
    updateContactFields: (fields) => {
      dispatch(updateFields(fields));
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
