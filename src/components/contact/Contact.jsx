import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup,
  Row } from 'react-bootstrap';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      message: '',
      name: '',
      isLoading: false,
      showSuccess: false,
      showError: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.onDismissSuccess = this.onDismissSuccess.bind(this);
    this.onDismissError = this.onDismissError.bind(this);
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

  submitForm() {
    this.setState({ isLoading: true });
    fetch('https://formspree.io/michael@michaelhumiston.com', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        _replyto: this.state.email,
        name: this.state.name,
        message: this.state.message,
        _subject: 'Contact Submission - Michael Humiston'
      })
    }).then(() => {
      this.setState({
        isLoading: false,
        showSuccess: true,
        email: '',
        message: '',
        name: ''
      });
    }).catch(() => {
      this.setState({
        isLoading: false,
        showError: true
      });
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <Alert bsStyle="success" hidden={!this.state.showSuccess} onDismiss={this.onDismiss}>
            <strong>Thanks! Message successfully sent.</strong>
          </Alert>

          <Alert bsStyle="danger" hidden={!this.state.showError} onDismiss={this.onDismissError}>
            <strong>There was a problem sending the message...</strong>
          </Alert>

          <Form horizontal>
            <FormGroup controlId="formHorizontalName">
              <Col componentClass={ControlLabel} sm={2}>
                Name
              </Col>
              <Col sm={4}>
                <FormControl
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={4}>
                <FormControl
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalMessage">
              <Col componentClass={ControlLabel} sm={2}>
                Message
              </Col>
              <Col sm={4}>
                <FormControl
                  name="message"
                  componentClass="textarea"
                  rows={3}
                  placeholder="Message"
                  value={this.state.message}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button
                  type="button"
                  disabled={this.state.isLoading}
                  onClick={!this.state.isLoading ? this.submitForm : null}
                >
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
