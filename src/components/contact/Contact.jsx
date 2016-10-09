import _ from 'lodash';
import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup,
  Glyphicon, HelpBlock, Row } from 'react-bootstrap';
import validate from 'validate.js';

class Contact extends React.Component {
  static getFormInitial() {
    return {
      name: {
        value: '',
        valid: true,
        errorMsg: ''
      },
      email: {
        value: '',
        valid: true,
        errorMsg: ''
      },
      message: {
        value: '',
        valid: true,
        errorMsg: ''
      }
    };
  }

  constructor(props) {
    super(props);
    this.state =
      _.merge({
        isLoading: false,
        showSuccess: false,
        showError: false
      }, Contact.getFormInitial());

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
    this.setState({
      showSuccess: false
    });
  }

  onDismissError() {
    this.setState({
      showError: false
    });
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
      _.forOwn(errors, ((errs, key) => {
        newState[key] = {};
        newState[key].valid = false;
        newState[key].errorMsg = errs[0];
      }));

      valid = false;
    }

    this.setState(_.merge(this.state, newState));

    return valid;
  }

  submitForm() {
    if (!this.validateForm()) {
      return false;
    }

    this.setState({ isLoading: true });

    fetch('https://formspree.io/michael@michaelhumiston.com', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email.value,
        _replyto: this.state.email.value,
        name: this.state.name.value,
        message: this.state.message.value,
        _subject: 'Contact Submission - Michael Humiston'
      })
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        this.setState(
          _.merge({
            isLoading: false,
            showSuccess: true
          }, Contact.getFormInitial())
        );
      } else {
        throw new Error(response.statusText || response.status);
      }
    }).catch(() => {
      this.setState({
        isLoading: false,
        showError: true
      });
    });

    return true;
  }

  handleChange(event) {
    this.setState(
      _.merge(this.state[event.target.name],
        {
          value: event.target.value
        })
    );
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <Alert
            bsStyle="success"
            hidden={!this.state.showSuccess}
            onDismiss={this.onDismissSuccess}
          >
            <strong>Thanks! Message successfully sent.</strong>
          </Alert>

          <Alert bsStyle="danger" hidden={!this.state.showError} onDismiss={this.onDismissError}>
            <strong>There was a problem sending the message...</strong>
          </Alert>

          <Form horizontal>
            <FormGroup
              controlId="formHorizontalName"
              validationState={this.state.name.valid ? null : 'error'}
            >
              <Col componentClass={ControlLabel} sm={2}>
                Name
              </Col>
              <Col sm={4}>
                <FormControl
                  name="name"
                  type="text"
                  placeholder="Name (Required)"
                  value={this.state.name.value}
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
              </Col>
              <Col sm={4}>
                {this.state.name.valid ? null : <HelpBlock>{this.state.name.errorMsg}</HelpBlock>}
              </Col>
            </FormGroup>

            <FormGroup
              controlId="formHorizontalEmail"
              validationState={this.state.email.valid ? null : 'error'}
            >
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={4}>
                <FormControl
                  name="email"
                  type="email"
                  placeholder="Email (Required)"
                  value={this.state.email.value}
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
              </Col>
              <Col sm={4}>
                {this.state.email.valid ? null : <HelpBlock>{this.state.email.errorMsg}</HelpBlock>}
              </Col>
            </FormGroup>

            <FormGroup
              controlId="formHorizontalMessage"
              validationState={this.state.message.valid ? null : 'error'}
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
                  value={this.state.message.value}
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
              </Col>
              <Col sm={4}>
                {this.state.message.valid ? null :
                  <HelpBlock>{this.state.message.errorMsg}</HelpBlock>}
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button
                  type="button"
                  disabled={this.state.isLoading}
                  onClick={!this.state.isLoading ? this.submitForm : null}
                >
                  <Glyphicon
                    glyph="refresh"
                    className={this.state.isLoading ? 'spinning' : 'spinning-hidden'}
                  />
                  {this.state.isLoading ? 'Submitting...' : 'Submit'}
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
  pageTitle: React.PropTypes.string.isRequired,
  setTitle: React.PropTypes.func
};

export default Contact;
