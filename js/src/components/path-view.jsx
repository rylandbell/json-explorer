var React = require('react');
var Helper = require('../helper.jsx');

//Displays the path string needed to reference the chosen path:
module.exports = ({ reduxState }) => (
  <div className='path-view'>
    {Helper.isNonEmpty(reduxState.data) ? 
      <div>
        <div className="help-text-small">Selected path:</div>
        <div className='current-path lead'>{Helper.pathArrayToString(reduxState.currentPath)}</div>
      </div>
      :
      <div></div>
    }

    

  </div>
);
