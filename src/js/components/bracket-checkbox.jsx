var React = require('react');

//Displays the path string needed to reference the chosen path:
module.exports = ({ reduxState, handleBracketCheckboxClick }) => (
  <label>
    <input type="checkbox" onChange={handleBracketCheckboxClick} value={reduxState.bracketNotation}/> Use bracket notation for key names
  </label>
);
