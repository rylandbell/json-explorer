var React = require('react');
var Helper = require('./helper.jsx');

//Displays the path string needed to reference the chosen path:
module.exports = ({ data, currentPath }) => {

  //Show appropriate helpText message, depending on if path is empty:
  var helpText = 'Click on a row to view its contents.';
  if (currentPath.length > 0) {
    helpText = 'Selected path: ';
  }

  return (
    <div className='path-view'>
      <div className={'help-text-small ' + (Helper.isNonEmpty(data) ? '' : 'hidden')}>{helpText}</div>
      <div className='current-path lead'>{Helper.pathArrayToString(currentPath)}</div>
    </div>
  );
};
