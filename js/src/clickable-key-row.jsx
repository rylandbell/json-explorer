var React = require('react');
var Helper = require('./helper.jsx');

//Displays a single key name for the chosen object or array
module.exports = ({keyName, levelDepth, isActive, updatePath}) => {
  var activeClass = (isActive ? 'active': '');
  function handleClick(){
    updatePath(levelDepth,keyName.toString());
  }
  return (
    <a className={"list-group-item key-row "+activeClass} onClick={handleClick}>
      {keyName.toString()}
    </a>
  );
};