import ReactGA from 'react-ga';

const reportPageview = () => {
  ReactGA.initialize('UA-145438516-1');
  ReactGA.set({ page: window.location.pathname, location: window.location.href });
  ReactGA.pageview(window.location.pathname + window.location.search);
};

export { reportPageview as default };
