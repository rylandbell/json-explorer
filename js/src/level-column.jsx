var React = require('react');

var ClickablePropertyRow = require('./clickable-property-row.jsx');
var TerminalPropertyRow = require('./terminal-property-row.jsx');
var LevelColumnCaption = require('./level-column-caption.jsx');

//Column with all properties for a single level in the current path
module.exports = ({ levelContent, currentPath, levelDepth, updatePath }) => {
  var propertyRows = [];

  //if the column represents an object, print its properties as rows
  if (typeof levelContent === 'object') {
    var markActive;

    //test if each entry is part of the currently selected path
    var keyCounter = 0;
    for (var property in levelContent) {
      markActive = false;
      if (currentPath[levelDepth] == property) {
        markActive = true;
      }

      propertyRows.push(<ClickablePropertyRow propertyName={property} levelDepth={levelDepth} isActive={markActive} updatePath={updatePath} key={keyCounter}/>);
      keyCounter++;
    }

  //for non-object columns, just print the value as a single, click-disabled row
  } else {
    propertyRows.push(<TerminalPropertyRow propertyName={levelContent} key={0}/>);
  }

  return (
    <div className='level-column'>
      <div className='list-group'>
        {propertyRows}
      </div>
      <LevelColumnCaption levelContent={levelContent}/>
    </div>
  );

};
