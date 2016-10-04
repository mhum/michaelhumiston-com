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
        <HeaderContainer
          title={this.state.pageTitle}
          links={this.props.links}
        />
        {
          React.cloneElement(this.props.children, {
            setTitle: this.setTitle,
            projects: this.props.projects
          })
        }
      </Grid>
    );
  }
}

const projects = [
  {
    id: 'lean-coffee',
    name: 'Lean Coffee',
    description: 'Simple Ruby on Rails web application for distributed Lean Coffee sessions.',
    uri: 'project/lean-coffee',
    image: 'projects/lean-coffee.png',
    descriptionExtended: '<p>This script will update the listening port for <a href="http://www.transmissionbt.com/" target="_blank">Transmission</a> with the forwarding port for users of <a href="https://www.privateinternetaccess.com/" target="_blank">Private Internet Access</a>.</p><p>There are three steps to this script. First, it makes a remote procedure call to Transmission to see if the current listening port is still open. If it isn’t, the script gathers the local ip address for the VPN device, and makes a request to PIA with your user name, password, and client id for the current forwarding port. Finally, another remote procedure call is made to Transmission to update the listening port with the forwarding port sent back by PIA.</p>',
    language: 'Ruby',
    framework: 'Ruby on Rails',
    repo: 'https://github.com/mhum/lean-coffee',
    pageStyle: 'top'
  }, {
    id: 'workout-tracker',
    name: 'Workout Tracker',
    description: 'A workout tracker written using the Ruby on Rails framework.',
    uri: 'project/workout-tracker',
    image: 'projects/workout-tracker.png',
    descriptionExtended: '<p>I am in the process of creating my own workout tracker to keep track of my workouts and programming. This application is built with the <a href="http://rubyonrails.org/">Ruby on Rails</a> application framework and <a href="http://getbootstrap.com/">Bootstrap</a> front-end framework. </p><p>I am doing <a href="http://www.t-nation.com/workouts/531-how-to-build-pure-strength">5/3/1 by Jim Wendler</a> and the core lift programming lends itself very well to a tracking application. I started off using a spreadsheet to create my programming, but that became unwieldy over time when I wanted to generate reports on my progress. I also essentially created the same spreadsheet every month with slightly different numbers. </p><p>With this application, I can create a months worth of core exercise programming with the single click of a button. It tells me how much to lift, how many lifts, and how many reps. I even have it tell me how much weight to put on each side of the barbell (yes, math is hard).</p><p>The other end result is to display my progress with fancy line charts. This is done with <a href="http://www.chartjs.org/">Chart.js</a>. The charts automagically update over time as more work is done.</p>',
    language: 'Ruby',
    framework: 'Ruby on Rails & Bootstrap',
    repo: 'https://github.com/mhum/workout-tracker',
    pageStyle: 'side'
  }, {
    id: 'pia-updater',
    name: 'Private Internet Access Transmission Updater',
    description: 'Script for updating the port for Transmission with port from PIA.',
    uri: 'project/pia-updater',
    image: 'projects/pia-updater.png',
    descriptionExtended: '<p>This script will update the listening port for Transmission with the forwarding port for users of Private Internet Access. <p>There are three steps to this script. First, it makes a remote procedure call to Transmission to see if the current listening port is still open. If it isn’t, the script gathers the local ip address for the VPN device, and makes a request to PIA with your user name, password, and client id for the current forwarding port. Finally, another remote procedure call is made to Transmission to update the listening port with the forwarding port sent back by PIA.',
    language: 'Tcl',
    framework: 'None',
    repo: 'https://github.com/mhum/pia-transmission-updater',
    pageStyle: 'side'
  }, {
    id: 'world-clock',
    name: 'World Office Clock',
    description: 'Dashboard for tracking current office times around the world written using Ext JS.',
    uri: 'project/world-clock',
    image: 'projects/office-clock.png',
    descriptionExtended: '<p>This application was written entirely in Javascript using the <a href="http://www.sencha.com/products/extjs/" target="_blank">Ext JS</a> framework. I created this application to better understand the Ext JS framework, how to write an entire application in it, and to compile it into a single .js file. </p><p>It is intended to be used as a dashboard of sorts. Offices from different timezones can be added and they will be shown across the screen. Also, opening and closing times for each office can be specified which will change the text color depending on if the office is open or closed. Finally, your settings are persisted into a cookie, so your chosen offices, font size, and enabled/disabled daylight map will be recreated when loading the application again.</p><p>You can also add a map to the middle of the screen displaying where the sun is currently on the Earth’s face. he sunlight map is created using a very similar technique found <a href="http://www.die.net/earth/" target="_blank">here</a>. Daily, I download a new cloud map. Once downloaded, I use <a href="http://xplanet.sourceforge.net/" target="_blank">xplanet</a> to put it, a daytime map, and nighttime map together every 15 minutes via cron job. The application refreshes itself every 30 minutes to display the updated map.</p>',
    language: 'Javascript',
    framework: 'Ext JS',
    repo: 'https://github.com/mhum/world-clock',
    pageStyle: 'side'
  }, {
    id: 'enhanced-world-clock',
    name: 'Enhanced World Office Clock',
    description: 'Dashboard for tracking current office times around the world written using JavaServer Faces.',
    uri: 'project/enhanced-world-clock',
    image: 'projects/enhanced-office-clock.png',
    descriptionExtended: '<p>I’m actually completely recreating the World Office Clock as a Java web application. There are some features lacking in the Ext JS version that I can definitely improve by re-writing it with a server back-end. For instance, the JS version won’t update the time as the timezones change and the timezones do not accurately reflect the locations as they change in and out of DST. I also want to be able to search for the location and have the application determine the time zone instead of relying on the user. </p><p>I’m taking this as the perfect way to learn <a href="http://en.wikipedia.org/wiki/JavaServer_Faces">JSF</a> and <a href="http://www.primefaces.org/">PrimeFaces</a> since I’ve only worked with <a href="http://en.wikipedia.org/wiki/JavaServer_Pages">JSP</a> and Javascript frameworks. I will also be integrating with some publicly available web service to do the location to timezone look-up. Currently I’m exploring Google’s APIs and using a combination of the <a href="https://developers.google.com/places/documentation/autocomplete">Places Autocomplete API</a> for location lookup and then <a href="https://developers.google.com/maps/documentation/timezone/">Maps Time Zone API</a> for the actual timezone look-up. Finally, I’ll be giving <a href="http://aws.amazon.com/elasticbeanstalk/">Amazon AWS Elastic Beanstalk</a> a try for my system/acceptance testing and potentially production usage. </p>',
    language: 'Java',
    framework: 'JavaServer Faces with Primefaces',
    repo: 'https://github.com/mhum/world-clockv2',
    pageStyle: 'side'
  }
];

App.propTypes = {
  children: React.PropTypes.shape({
    name: React.PropTypes.string,
    url: React.PropTypes.string
  }).isRequired,
  projects: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  links: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

App.defaultProps = {
  projects,
  links: [
    {
      uri: '/',
      name: 'Home',
      isIndex: true,
      hasSubMenu: false
    }, {
      uri: 'projects',
      name: 'Projects',
      isIndex: false,
      hasSubMenu: true,
      items: projects
    }, {
      uri: 'about',
      name: 'About Me',
      isIndex: false,
      hasSubMenu: false
    }
  ]
};

export default App;
