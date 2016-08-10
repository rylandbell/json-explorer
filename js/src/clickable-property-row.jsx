var React = require('react');
var Helper = require('./helper.jsx');

//Displays a single property name for the chosen object or array
module.exports = ({ propertyName, levelDepth, isActive, updatePath }) => {
  var activeClass = (isActive ? 'active' : '');
  function handleClick() {
    updatePath(levelDepth, propertyName.toString());
  }

  return (
    <a className={'list-group-item property-row ' + activeClass} onClick={handleClick}>
      {propertyName.toString()}
    </a>
  );
};
