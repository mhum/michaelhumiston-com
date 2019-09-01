const loadProjects = () => ({
  projects: [
    {
      id: 1,
      shortName: 'lean-coffee',
      name: 'Lean Coffee',
      description: 'Simple Ruby on Rails web application for distributed Lean Coffee sessions.',
      uri: '/projects/lean-coffee',
      image: '/projects/lean-coffee.png',
      descriptionExtended: '<p>Lean Coffee is a simple web application built with Ruby on Rails with the intention of being used for distributed <a href="http://leancoffee.org" target="_blank">Lean Coffee sessions</a>.</p><h4>Features</h4><ul><li>Create sessions for holding topics</li><li>Add topics to board</li><li>Add descriptions, up/down vote, and move topics</li><li>Topic information is persisted in a SQLite DB</li><li>Timer to keep track of time left discussing topic</li><li>WebSocket support for topic and timer management</li></ul>',
      language: 'Ruby',
      framework: 'Ruby on Rails',
      repo: 'https://github.com/mhum/lean-coffee',
      pageStyle: 'top',
      currentVersion: '2.3'
    },
    {
      id: 2,
      shortName: 'pia-updater',
      name: 'Private Internet Access Transmission Updater',
      description: 'Script for updating the port for Transmission with port from PIA.',
      uri: '/projects/pia-updater',
      image: '/projects/pia-updater.png',
      descriptionExtended: '<p>This script will update the listening port for Transmission with the forwarding port for users of Private Internet Access. <p>There are three steps to this script. First, it makes a remote procedure call to Transmission to see if the current listening port is still open. If it isn’t, the script gathers the local ip address for the VPN device, and makes a request to PIA with your user name, password, and client id for the current forwarding port. Finally, another remote procedure call is made to Transmission to update the listening port with the forwarding port sent back by PIA.',
      language: 'Tcl',
      framework: 'None',
      repo: 'https://github.com/mhum/pia-transmission-updater',
      pageStyle: 'side',
      currentVersion: '2.1'
    },
    {
      id: 3,
      shortName: 'nfs-dynamic-dns',
      name: 'NearlyFreeSpeech.NET Dynamic DNS',
      description: 'Script for updating NearlyFreeSpeech DNS entry',
      uri: '/projects/nfs-dynamic-dns',
      image: '/projects/nfs-dynamic-dns.png',
      descriptionExtended: '<p>This script will update the A DNS record for a subdomain at NearlyFreeSpeech.NET with the public IP address for the machine the script runs on. Run this script on a server in which the public IP address is dynamic and changes so your subdomain is always up to date.</p><p>There are two steps to this script. First, it retrieves the configured IP address for the subdomain, the current public IP address of the server, and then compares the two. If the public IP address is different, it updates the A record of the subdomain with the new IP address.</p>',
      language: 'Tcl',
      framework: 'None',
      repo: 'https://github.com/mhum/nfs-dynamic-dns',
      pageStyle: 'side',
      currentVersion: '1.0'
    },
    {
      id: 4,
      shortName: 'michael-humiston',
      name: 'MichaelHumiston.com',
      description: 'This website! My personal website.',
      uri: '/projects/michael-humiston',
      image: '/projects/michael-humiston.png',
      descriptionExtended: '<p>This website was written as a sigle-page application with React. It is also designed to be mobile-responsive using Bootstrap.</p>',
      language: 'JavaScript',
      framework: 'React',
      repo: 'https://github.com/mhum/michaelhumiston-com',
      pageStyle: 'side',
      currentVersion: 'N/A'
    },
    {
      id: 5,
      shortName: 'workout-tracker',
      name: 'Workout Tracker',
      description: 'A workout tracker written using the Ruby on Rails framework.',
      uri: '/projects/workout-tracker',
      image: '/projects/workout-tracker.png',
      descriptionExtended: '<p>A simple workout tracker to keep track of workout progress and to plan future programming. This application is built with <a href="http://rubyonrails.org/">Ruby on Rails</a> and <a href="http://getbootstrap.com/">Bootstrap</a> for the front-end visuals. It is based on <a href="http://www.t-nation.com/workouts/531-how-to-build-pure-strength">5/3/1 by Jim Wendler</a>.</p><p><h4>Features</h4> <ul><li>Create a months worth of core exercise programming with the single click of a button</li><li> Displays how much to lift, how many lifts, and how many reps</li><li>Displays how much weight to put on each side of the barbell (why would I want to do math while lifting?)</li><li>Charts progress automatically over time with fancy line charts using <a href="http://www.chartjs.org/">Chart.js</a></li></ul></p>',
      language: 'Ruby',
      framework: 'Ruby on Rails & Bootstrap',
      repo: 'https://github.com/mhum/workout-tracker',
      pageStyle: 'top',
      currentVersion: '1.0'
    },
    {
      id: 6,
      shortName: 'world-clock',
      name: 'World Office Clock',
      description: 'Dashboard for tracking current office times around the world written using Ext JS.',
      uri: '/projects/world-clock',
      image: '/projects/office-clock.png',
      descriptionExtended: "<p>This application was written entirely in Javascript using <a href=\"http://www.sencha.com/products/extjs/\" target=\"_blank\">Ext JS</a>. It is also set up to compile it into a single .js file. It is intended to be used as a dashboard of sorts for tracking the times of coworker's offices across multiple timezones.</p><p><h4>Features</h4><ul><li>Add offices from different timezones</li><li>Configure opening and closing times for each office</li><li> Text color changes depending on if the office is open or closed</li><li> Settings are persisted into a cookie, so settings are re-applied when reloading</li></ul></p>",
      language: 'Javascript',
      framework: 'Ext JS',
      repo: 'https://github.com/mhum/world-clock',
      pageStyle: 'top',
      currentVersion: 'N/A'
    },
    {
      id: 7,
      shortName: 'enhanced-world-clock',
      name: 'Enhanced World Office Clock',
      description: 'Dashboard for tracking current office times around the world written using JavaServer Faces.',
      uri: '/projects/enhanced-world-clock',
      image: '/projects/enhanced-office-clock.png',
      descriptionExtended: "<p>A re-write of the JavaScript World Office Clock as a Java web application. It has the same features as the JavaScript application plus integration with Google's <a href=\"https://developers.google.com/places/documentation/autocomplete\">Places Autocomplete API</a> and <a href=\"https://developers.google.com/maps/documentation/timezone/\">Maps Time Zone</a> APIs for location lookup and actual timezone look-up. This is not finished.</p>",
      language: 'Java',
      framework: 'JavaServer Faces with Primefaces',
      repo: 'https://github.com/mhum/world-clockv2',
      pageStyle: 'top',
      currentVersion: 'N/A'
    }
  ]
});

export { loadProjects as default };
