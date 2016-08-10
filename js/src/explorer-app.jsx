var InputPane = require('./input-pane');
var ExplorerPane = require('./explorer-pane');
var ContentPane = require('./content-pane');

module.exports = ({reduxState,handleTextChange,handleFormSubmit,updatePath}) => {
  return (
    <div className="container ">
      <div className="row">
        <div className="col-xs-12 col-md-12">
          <p className="non-app-text">Don't have any JSON strings handy? <a href="" data-toggle="modal" data-target="#sample-strings">Click here</a> for a few samples to copy and paste.</p>
        </div>
      </div>
      <div className="row main-app-row">
        <div className="col-xs-12 col-md-4">
          <InputPane textContent={reduxState.textContent} handleTextChange={handleTextChange} handleFormSubmit={handleFormSubmit}/>
        </div> 
        <div className="col-xs-12 col-md-8">
          <ExplorerPane data= {reduxState.data} currentPath= {reduxState.currentPath} updatePath= {updatePath} />
        </div>  
      </div>
      <div className="row">
        <div>
          <div className={"error-msg alert alert-danger "+(reduxState.showError ? "":"hidden")} role="alert">Sorry, but that doesn't appear to be a valid JSON string. Please try again.</div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <ContentPane data= {reduxState.data} currentPath= {reduxState.currentPath} />
        </div>
      </div>
    </div>
  );
}

//Contains the text input and left 1/3 of the app
var InputPane = ({textContent,handleTextChange,handleFormSubmit}) => {
  return (
    <div className="input-pane">
      <form action="" onSubmit={handleFormSubmit}>
        <div className="form-group" >
          <textarea className="form-control" rows="15" value={textContent} onChange={handleTextChange} placeholder="Paste a JSON string here (without any surrounding quote marks)...">
          </textarea>
          <input className="btn btn-primary" id="btn-data-submit" type="submit" value="Go!" />
        </div>
      </form>
    </div>
  );
};

//Contains all of the columns, captions, and path displays.
var ExplorerPane = ({data, currentPath, updatePath}) => {
  return (
    <div className="explorer-pane">
      <div className="row">
        <div className="col-xs-12">
          <ColumnView data={data} currentPath={currentPath} updatePath={updatePath} />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <PathView currentPath={currentPath} data={data}/>
        </div>
      </div>
    </div>
  );
};

//Container for all of the LevelColumns
var ColumnView = ({data, currentPath, updatePath}) => {
  //get array of all visible levels, beginning with the full data object and getting more specific by traveling along currentPath
  var visibleLevels = getAllLevels(data,currentPath);

  //convert the levels from JS values to LevelColumn components
  visibleLevels = visibleLevels.map(
    (levelContent,levelDepth) => {
      return <LevelColumn data={levelContent} levelDepth={levelDepth} currentPath={currentPath} updatePath={updatePath} />
    }
  );

  //draw all of the LevelColumn components:
  return (
    <div className="column-view clearfix">
      <div className={"explorer-help-text "+ (!isNonEmpty(data)? "":"hidden")}>...and then explore its nested structure in this pane.
      </div>
      {visibleLevels}
    </div>
  );
};

//Column with all keys for a single level in the current path
var LevelColumn = ({data,currentPath,levelDepth,updatePath}) => {
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

//Displays a single key name for the chosen object or array
var ClickableKeyRow = ({keyName, levelDepth, isActive, updatePath}) => {
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

//Displays a value for non-objects at the end of the tree; is not clickable
var TerminalKeyRow = ({keyName, isActive}) => {
  return (
    <a className={"list-group-item key-row disabled"}>
      {keyName.toString()}
    </a>
  );
};

//assign a caption depending on the type of the value represented in the column
var LevelColumnCaption = ({data}) => {
  return (
    <div className="level-column-caption-container">
      <div className="level-column-caption">{getType(data)}</div>
    </div>
  );
};

//Displays the path string needed to reference the chosen path:
var PathView = ({data, currentPath}) => {  
  //Show appropriate helpText message, depending on if path is empty:
  var helpText = 'Click on a row to view its contents.';
  if(currentPath.length>0){
    helpText = 'Selected path: '
  }

  return (
    <div className="path-view">
      <div className={"help-text-small " + (isNonEmpty(data)? "":"hidden")}>{helpText}</div>
      <div className="current-path lead">{pathArrayToString(currentPath)}</div>
    </div>
  );
};

//displays the JSON-encoded content of the chosen path, with whitespace for readability:
var ContentPane = ({data, currentPath}) => {
  var displayedData = data;
  for (var i = 0; i < currentPath.length; i++){
    displayedData = displayedData[currentPath[i]];
  }
  return (
    <div className={"content-pane "+(isNonEmpty(data)? "":"hidden")}>
      <br />
      <p className="help-text-small"> Contents of selected path: </p>
      <pre>{JSON.stringify(displayedData,null,2)}</pre>
    </div>
  );
};