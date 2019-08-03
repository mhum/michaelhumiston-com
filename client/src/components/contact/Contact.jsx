/* global grecaptcha */

import _find from 'lodash/find';
import PropTypes from 'prop-types';
import {
  Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup,
  Glyphicon, HelpBlock, Row
} from 'react-bootstrap';
import { connect } from 'react-redux';
import validate from 'validate.js';

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
    this.getField = this.getField.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidMount() {
    const { pageTitle, setTitle, updateContactField } = this.props;
    setTitle(pageTitle);
    grecaptcha.render('recaptchaTarget', {
      sitekey: '6LeKIg0TAAAAACb_BCdlKpcG9__3g-2uremLfZym',
      callback: (resp => updateContactField('captcha', resp))
    });
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
    return _find(contact.fields, { name });
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
        <Col xs={12}>
          <Alert
            bsStyle="success"
            hidden={!contact.showSuccess}
            onDismiss={this.onDismissSuccess}
          >
            <strong>Thanks! Message successfully sent.</strong>
          </Alert>

          <Alert
            bsStyle="danger"
            hidden={!contact.showError}
            onDismiss={this.onDismissError}
          >
            <strong>There was a problem sending the message...</strong>
          </Alert>

          <Form horizontal>
            <FormGroup
              controlId="formHorizontalName"
              validationState={name.valid ? null : 'error'}
            >
              <Col componentClass={ControlLabel} sm={2}>
                Name
              </Col>
              <Col sm={4}>
                <FormControl
                  name="name"
                  type="text"
                  placeholder="Name (Required)"
                  value={name.value}
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
              </Col>
              <Col sm={4}>
                {name.valid ? null : (
                  <HelpBlock>
                    {' '}
                    {name.errorMsg}
                  </HelpBlock>
                )}
              </Col>
            </FormGroup>

            <FormGroup
              controlId="formHorizontalEmail"
              validationState={email.valid ? null : 'error'}
            >
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={4}>
                <FormControl
                  name="email"
                  type="email"
                  placeholder="Email (Required)"
                  value={email.value}
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
              </Col>
              <Col sm={4}>
                {email.valid ? null : <HelpBlock>{email.errorMsg}</HelpBlock>}
              </Col>
            </FormGroup>

            <FormGroup
              controlId="formHorizontalMessage"
              validationState={message.valid ? null : 'error'}
            >
              <Col componentClass={ControlLabel} sm={2}>
                Message
              </Col>
              <Col sm={4}>
                <FormControl
                  name="message"
                  componentClass="textarea"
                  rows={3}
                  placeholder="Message (Required)"
                  value={message.value}
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
              </Col>
              <Col sm={4}>
                {message.valid ? null : <HelpBlock>{message.errorMsg}</HelpBlock>}
              </Col>
            </FormGroup>

            <FormGroup
              controlId="formCaptcha"
              validationState={captcha.valid ? null : 'error'}
            >
              <Col smOffset={2} sm={4}>
                <div id="recaptchaTarget" />
              </Col>
              <Col sm={4}>
                {captcha.valid ? null : <HelpBlock>{captcha.errorMsg}</HelpBlock>}
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button
                  type="button"
                  disabled={contact.isLoading}
                  onClick={!contact.isLoading ? this.submitForm : null}
                >
                  <Glyphicon
                    glyph="refresh"
                    className={contact.isLoading ? 'spinning' : 'spinning-hidden'}
                  />
                  {contact.isLoading ? 'Submitting...' : 'Submit'}
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    );
  }
}

Contact.defaultProps = {
  pageTitle: 'Contact'
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
  setTitle: PropTypes.func.isRequired,
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
