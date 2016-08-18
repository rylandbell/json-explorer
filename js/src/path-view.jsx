var React = require('react');
var Helper = require('./helper.jsx');

//Displays the path string needed to reference the chosen path:
module.exports = ({ reduxState }) => {
  <div className='path-view'>
    <div className={'help-text-small ' + (Helper.isNonEmpty(reduxState.data) ? '' : 'hidden')}>Selected path:</div>
    <div className='current-path lead'>{Helper.pathArrayToString(reduxState.currentPath)}</div>
  </div>;
};
