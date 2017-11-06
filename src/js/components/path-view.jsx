var React = require('react');
var Helper = require('../helper.jsx');
var BracketCheckbox = require('./bracket-checkbox.jsx');

//Displays the path string needed to reference the chosen path:
module.exports = ({ reduxState, handleBracketCheckboxClick }) => (
  <div className='path-view'>
    {Helper.isNonEmpty(reduxState.data) ? 
      <div>
        <div className="help-text-small">Selected path:</div>
        <div className='current-path lead'>{Helper.pathArrayToString(reduxState.currentPath)}</div>
        <div class="checkbox">
          <BracketCheckbox reduxState={reduxState} handleBracketCheckboxClick={handleBracketCheckboxClick} />
        </div>
      </div>
      :
      null
    }
  </div>
);
