import _forOwn from 'lodash/forOwn';
import _merge from 'lodash/merge';
import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup,
  Glyphicon, HelpBlock, Row } from 'react-bootstrap';
import validate from 'validate.js';

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.onDismissSuccess = this.onDismissSuccess.bind(this);
    this.onDismissError = this.onDismissError.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidMount() {
    this.props.setTitle(this.props.pageTitle);
  }

  onDismissSuccess() {
    this.props.dismissContactSuccess();
  }

  onDismissError() {
    this.props.dismissContactError();
  }

  validateForm() {
    let valid = true;
    const newState = {
      name: {
        valid: true,
        errorMsg: ''
      },
      email: {
        valid: true,
        errorMsg: ''
      },
      message: {
        valid: true,
        errorMsg: ''
      }
    };
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
      }
    };

    const errors = validate({
      name: this.state.name.value,
      email: this.state.email.value,
      message: this.state.message.value
    }, constraints);

    if (errors) {
      _forOwn(errors, ((errs, key) => {
        newState[key] = {};
        newState[key].valid = false;
        newState[key].errorMsg = errs[0];
      }));

      valid = false;
    }

    this.setState(_merge(this.state, newState));

    return valid;
  }

  submitForm() {
    if (!this.validateForm()) {
      return false;
    }

    const details = {
      email: this.state.email.value,
      name: this.state.name.value,
      message: this.state.message.value
    };

    this.props.submitContact(details);


    return true;
  }

  handleChange(event) {
    this.props.updateContactField(event);
  }

  render() {
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
              validationState={this.props.contact.fields.name.valid ? null : 'error'}
            >
              <Col componentClass={ControlLabel} sm={2}>
                Name
              </Col>
              <Col sm={4}>
                <FormControl
                  name="name"
                  type="text"
                  placeholder="Name (Required)"
                  value={this.props.contact.fields.name.value}
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
              </Col>
              <Col sm={4}>
                {this.props.contact.fields.name.valid ? null : <HelpBlock>
                  {this.props.contact.fields.name.errorMsg}</HelpBlock>}
              </Col>
            </FormGroup>

            <FormGroup
              controlId="formHorizontalEmail"
              validationState={this.props.contact.fields.email.valid ? null : 'error'}
            >
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={4}>
                <FormControl
                  name="email"
                  type="email"
                  placeholder="Email (Required)"
                  value={this.props.contact.fields.email.value}
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
              </Col>
              <Col sm={4}>
                {this.props.contact.fields.email.valid ? null : <HelpBlock>
                  {this.props.contact.fields.email.errorMsg}</HelpBlock>}
              </Col>
            </FormGroup>

            <FormGroup
              controlId="formHorizontalMessage"
              validationState={this.props.contact.fields.message.valid ? null : 'error'}
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
                  value={this.props.contact.fields.message.value}
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
              </Col>
              <Col sm={4}>
                {this.props.contact.fields.message.valid ? null :
                <HelpBlock>{this.props.contact.fields.message.errorMsg}</HelpBlock>}
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
    fields: React.PropTypes.shape({
      name: React.PropTypes.shape({
        value: React.PropTypes.string,
        valid: React.PropTypes.bool,
        errorMsg: React.PropTypes.string
      }),
      email: React.PropTypes.shape({
        value: React.PropTypes.string,
        valid: React.PropTypes.bool,
        errorMsg: React.PropTypes.string
      }),
      message: React.PropTypes.shape({
        value: React.PropTypes.string,
        valid: React.PropTypes.bool,
        errorMsg: React.PropTypes.string
      })
    })
  }),
  pageTitle: React.PropTypes.string.isRequired,
  setTitle: React.PropTypes.func,
  submitContact: React.PropTypes.func,
  dismissContactSuccess: React.PropTypes.func,
  dismissContactError: React.PropTypes.func,
  updateContactField: React.PropTypes.func
};

export default Contact;
