var React = require('react');

//Displays a single property name for the chosen object or array
module.exports = ({ propertyName, levelDepth, isActive, updatePath }) => {
  function handleClick() {
    updatePath(levelDepth, propertyName.toString());
  }

  return (
    <a className={'list-group-item property-row clickable' + (isActive ? 'active' : '')} onClick={handleClick}>
      {propertyName.toString()}
    </a>
  );
};
