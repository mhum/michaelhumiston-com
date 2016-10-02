import { Grid } from 'react-bootstrap';

import HeaderContainer from './layout/header/HeaderContainer';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageTitle: 'Page Title'
    };

    this.setTitle = this.setTitle.bind(this);
  }

  setTitle(pageTitle) {
    this.setState({
      pageTitle
    });
    document.title = `${pageTitle} - Michael Humiston`;
  }

  render() {
    return (
      <Grid id="container">
        <HeaderContainer title={this.state.pageTitle} />
        {
          React.cloneElement(this.props.children, {
            setTitle: this.setTitle
          })
        }
      </Grid>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.shape({
    name: React.PropTypes.string,
    url: React.PropTypes.string
  }).isRequired
};

export default App;
