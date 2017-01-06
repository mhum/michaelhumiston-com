/* global grecaptcha */

import _find from 'lodash/find';
import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup,
  Glyphicon, HelpBlock, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import validate from 'validate.js';

import { sendEmail, dismissSuccess, dismissError, updateField, updateFields } from '../../redux/actions';

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
    this.props.setTitle(this.props.pageTitle);
    grecaptcha.render('recaptchaTarget', {
      sitekey: '6LeKIg0TAAAAACb_BCdlKpcG9__3g-2uremLfZym',
      callback: (resp => this.props.updateContactField('captcha', resp))
    });
  }

  onDismissSuccess() {
    this.props.dismissContactSuccess();
  }

  onDismissError() {
    this.props.dismissContactError();
  }

  getField(name) {
    return _find(this.props.contact.fields, { name });
  }

  validateForm() {
    let valid = false;

    const fields = this.props.contact.fields;
    const constraints = {
      name: {
        presence: true
      },
      email: {
        presence: true,
        email: true
      },
      message: {
        presence: true
      },
      captcha: {
        presence: true
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
          f.errorMsg = errors[field.name][0];
        } else {
          f.valid = true;
          f.errorMsg = '';
        }
      });
    } else {
      valid = true;
    }

    this.props.updateContactFields(fields);

    return valid;
  }

  submitForm() {
    if (!this.validateForm()) {
      return false;
    }

    const details = {
      name: this.getField('name').value,
      email: this.getField('email').value,
      message: this.getField('message').value,
      captcha: this.getField('captcha').value
    };

    this.props.submitContact(details);

    return true;
  }

  handleChange(event) {
    this.props.updateContactField(event.target.name, event.target.value);
  }

  render() {
    if (!this.props.contact.fields) {
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
            hidden={!this.props.contact.showSuccess}
            onDismiss={this.onDismissSuccess}
          >
            <strong>Thanks! Message successfully sent.</strong>
          </Alert>

          <Alert
            bsStyle="danger"
            hidden={!this.props.contact.showError}
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
                {name.valid ? null : <HelpBlock> {name.errorMsg}</HelpBlock>}
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
                  disabled={this.props.contact.isLoading}
                  onClick={!this.props.contact.isLoading ? this.submitForm : null}
                >
                  <Glyphicon
                    glyph="refresh"
                    className={this.props.contact.isLoading ? 'spinning' : 'spinning-hidden'}
                  />
                  {this.props.contact.isLoading ? 'Submitting...' : 'Submit'}
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
  contact: React.PropTypes.shape({
    isLoading: React.PropTypes.bool,
    showError: React.PropTypes.bool,
    showSuccess: React.PropTypes.bool,
    captcha: React.PropTypes.string,
    fields: React.PropTypes.arrayOf(React.PropTypes.object)
  }),
  pageTitle: React.PropTypes.string.isRequired,
  setTitle: React.PropTypes.func,
  submitContact: React.PropTypes.func,
  dismissContactSuccess: React.PropTypes.func,
  dismissContactError: React.PropTypes.func,
  updateContactField: React.PropTypes.func,
  updateContactFields: React.PropTypes.func
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
