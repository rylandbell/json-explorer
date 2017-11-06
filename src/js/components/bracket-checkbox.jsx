var React = require('react');

//Displays the path string needed to reference the chosen path:
module.exports = ({ reduxState, handleBracketCheckboxClick }) => (
  <div className="checkbox bracket-checkbox">
    <label>
      <input type="checkbox" onChange={handleBracketCheckboxClick} value={reduxState.useBracketNotation}/> Use bracket notation for key names
    </label>
  </div>
);
