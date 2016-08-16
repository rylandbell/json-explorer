var React = require('react');

//Contains all of the columns, captions, and path displays.
module.exports = ({ reduxState }) => (
  <div className={'error-msg alert alert-danger ' + (reduxState.showError ? '' : 'hidden')} role='alert'>Sorry, but that doesn't appear to be a valid JSON string. Please try again.
  </div>
);
