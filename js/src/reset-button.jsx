var React = require('react');
var Helper = require('./helper.jsx');

module.exports = ({ reduxState, resetState }) => (
  <button className={'btn btn-primary pull-right ' + (Helper.isNonEmpty(reduxState.data) ? '' : 'hidden')} onClick={resetState}> Reset</button>
);
