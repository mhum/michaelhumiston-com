import { Button, Col, ControlLabel, Form, FormControl, FormGroup, Row } from 'react-bootstrap';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      message: '',
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  componentDidMount() {
    this.props.setTitle(this.props.pageTitle);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
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
        message: this.state.message
      })
    }).then(() => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <Form horizontal>
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
