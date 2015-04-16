const React = require('react'),
      RouteHandler = require('react-router').RouteHandler,
      Header = require('../components/Header.react.jsx'),
      SessionStore = require('../stores/SessionStore.react.jsx'),
      RouteStore = require('../stores/RouteStore.react.jsx');

function getStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    email: SessionStore.getEmail()
  };
}

var SmallApp = React.createClass({

  getInitialState() {
    return getStateFromStores();
  },

  componentDidMount() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange() {
    this.setState(getStateFromStores());
  },

  render() {
    return (
      <div className="app">
        <Header
          isLoggedIn={this.state.isLoggedIn}
          email={this.state.email} />
        <RouteHandler/>
      </div>
    );
  }

});

module.exports = SmallApp;