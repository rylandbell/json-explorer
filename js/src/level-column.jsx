var React = require('react');
var Helper = require('./helper.jsx');

var ClickableKeyRow = require('./clickable-key-row.jsx');
var TerminalKeyRow = require('./terminal-key-row.jsx');
var LevelColumnCaption = require('./level-column-caption.jsx');


//Column with all keys for a single level in the current path
module.exports = ({data,currentPath,levelDepth,updatePath}) => {
  var keyRows = [];

  //if the column represents an object, print its keys as rows
  if (typeof data === 'object'){
    var markActive;

    //test if each entry is part of the currently selected path
    for (var key in data){
      markActive = false;
      if (currentPath[levelDepth] == key){
        markActive = true;
      }
      keyRows.push(<ClickableKeyRow keyName={key} levelDepth={levelDepth} isActive={markActive} updatePath={updatePath}/>);
    }

  //for non-object columns, just print the value as a single, click-disabled row
  } else {
    keyRows.push(<TerminalKeyRow keyName={data} />);
  }

  return (
    <div className="level-column">
      <div className="list-group">
        {keyRows}
      </div>
      <LevelColumnCaption data={data}/>
    </div>
  );

}





