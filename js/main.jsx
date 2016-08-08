//I'm just including Redux as a UMD module via a script tag, meaning that it's equal to window.Redux;
var _createStore = Redux.createStore;

var ExplorerApp = React.createClass({
  getInitialState: function() {
    return {
      data: {},
      currentPath: [],
      showError: false,
      textContent: ''
    };
  },
  handleTextChange: function(e){
    e.preventDefault();
    this.setState({textContent: e.target.value});
  },
  handleFormSubmit: function(e){
    e.preventDefault();
    this.updateData(this.state.textContent);
  },
  updateData: function(inputString) {
    try {
      this.setState({
        data: JSON.parse(inputString),
        currentPath: [],
        showError: false
      });
    } catch(err) {
      this.setState({
        data: {},
        currentPath: [],
        showError: true
      });
    }
  },
  updatePath: function(level,newKey){
    var newPath = this.state.currentPath.slice(0,level);
    newPath.push(newKey);
    this.setState({
      currentPath: newPath
    });
  },
  render: function() {
    return (
      <div className="container ">
        <div className="row">
          <div className="col-xs-12 col-md-12">
            <p className="non-app-text">Don't have any JSON strings handy? <a href="" data-toggle="modal" data-target="#sample-strings">Click here</a> for a few samples to copy and paste.</p>
          </div>
        </div>
        <div className="row main-app-row">
          <div className="col-xs-12 col-md-4">
            <InputPane textContent={this.state.textContent} handleTextChange={this.handleTextChange} handleFormSubmit={this.handleFormSubmit}/>
          </div> 
          <div className="col-xs-12 col-md-8">
            <ExplorerPane data= {this.state.data} currentPath= {this.state.currentPath} updatePath= {this.updatePath}/>
          </div>  
        </div>
        <div className="row">
          <div>
            <div className={"error-msg alert alert-danger "+(this.state.showError ? "":"hidden")} role="alert">Sorry, but that doesn't appear to be a valid JSON string. Please try again.</div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <ContentPane data= {this.state.data} currentPath= {this.state.currentPath} />
          </div>
        </div>
      </div>
    );
  }
});

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
          <ColumnView data={data} currentPath={currentPath} updatePath={updatePath}/>
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
      return <LevelColumn data={levelContent} levelDepth={levelDepth} currentPath={currentPath} updatePath={updatePath}/>
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
var LevelColumn = React.createClass({
  handleClick: function(e){
    if(e.target.className.search('disabled')<0 && e.target.className.search('key-row')>=0){
      this.props.updatePath(this.props.levelDepth,e.target.firstChild.nodeValue);
    }
  },

  render: function() {
    var keyRows = [];

    //if the column represents an object, print its keys as rows
    if (typeof this.props.data === 'object'){
      var markActive;

      //test if each entry is part of the currently selected path
      for (var key in this.props.data){
        markActive = false;
        if (this.props.currentPath[this.props.levelDepth] == key){
          markActive = true;
        }
        keyRows.push(<KeyRow keyName={key} isActive={markActive} isDisabled={false}/>);
      }

    //for non-object columns, just print the value as a single, click-disabled row
    } else {
      keyRows.push(<KeyRow keyName={this.props.data} isActive={false} isDisabled={true} />);
    }

    return (
      <div className="level-column" onClick={this.handleClick}>
        <div className="list-group">
          {keyRows}
        </div>
        <LevelColumnCaption data={this.props.data}/>
      </div>
    );
  }
});

//Displays a single key name for the chosen object or array; for non-objects, displays the value and is not clickable
var KeyRow = ({keyName, isActive, isDisabled}) => {
  var disabledClass = (isDisabled ? 'disabled' : '');
  var activeClass = (isActive ? 'active': '');

  return (
    <a className={"list-group-item key-row "+disabledClass+activeClass}>
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

ReactDOM.render(
  <ExplorerApp />, document.getElementById('explorer-app')
);

//-------------------- Helper functions: --------------------

//returns an array of objects, getting iteratively finer as it traces the given path
function getAllLevels (data, path){
  if(Object.keys(data).length === 0 && data.constructor === Object){
    var allLevels = [];
  } else {
    var allLevels = [data];
  }

  function addLevelAndChildren (subData, subPath){
    var nextKey = subPath[0];
    allLevels.push(subData[nextKey]);
    if (subPath.length>1){
      var newSubPath = subPath.slice(1);
      addLevelAndChildren(subData[nextKey],newSubPath);
    }
  }
  if (path.length > 0) {
    addLevelAndChildren (data,path);
  }

  return allLevels;
}

//tests if an object has contents or is empty
function isNonEmpty(obj){
  return !(Object.keys(obj).length === 0 && obj.constructor === Object)
}

function getType(data) {
  var type = typeof data;
  if(Array.isArray(data)){
    type="array";
  }
  if(!isNaN(data) && (typeof data!=='object') && (typeof data!=='boolean')){
    type="number";
  }
  return type;
}

//converts the arrays used to represent paths in state to a JS-valid path string.
function pathArrayToString(pathArray) {
  return pathArray
    .map(function(keyName){
      if(isNaN(keyName)){
        return '.'+keyName;
      } else {
        return '['+keyName+']';
      }
    })
    .join('');
}
