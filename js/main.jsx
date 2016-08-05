var ExplorerApp = React.createClass({
  getInitialState: function() {
    return {
      data: {}
    };
  },
  changeData: function(inputString) {
    try {
      this.setState({
        data: inputString
      });
    } catch(err) {
      console.log('nope');
    }
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <p>Don't have any JSON strings handy? <a href="" data-toggle="modal" data-target="#sample-strings">Click here</a> for a few samples to copy and paste.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-4">
            <InputPane changeData={this.changeData}/>
          </div> 
          <div className="col-xs-12 col-md-8">
            <ExplorerPane data= {this.state.data} />
          </div>  
        </div>
      </div>
    );
  }
});

var InputPane = React.createClass({
  getInitialState: function() {
    return {
      textContent: '',
      showError: false
    };
  },
  handleTextChange: function(e){
    e.preventDefault();
    this.setState({textContent: e.target.value});
  },
  handleFormSubmit: function(e){
    e.preventDefault();
    this.setState({showError: false});
    try{
      this.props.changeData(JSON.parse(this.state.textContent));
    } catch(err) {
      this.setState({showError: true});
    }
  },
  render: function() {
    return (
      <div className="input-pane">
        <form action="" onSubmit={this.handleFormSubmit}>
          <div className="form-group" >
            <textarea className="form-control" rows="15" value={this.state.textContent} onChange={this.handleTextChange} placeholder="Paste a JSON string here (without any surrounding quotes).">
            </textarea>
            <input className="btn btn-primary" type="submit" value="Update" />
          </div>
        </form>
        <div className={"alert alert-warning "+(this.state.showError ? "":"hidden")} role="alert">Sorry, but that doesn't appear to be a valid JSON string.</div>
      </div>
    );
  }
});



var ExplorerPane = React.createClass({
  getInitialState: function() {
    return {
      currentPath: []
    };
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
      <div className="explorer-pane">
        <div className="row">
          <div className="col-xs-12">
            <ColumnView data={this.props.data} currentPath={this.state.currentPath} updatePath={this.updatePath}/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <PathView currentPath={this.state.currentPath}/>
          </div>
        </div>
      </div>
    );
  }
});

var ColumnView = React.createClass({
  render: function() {
    var currentPath = this.props.currentPath;
    var updatePath = this.props.updatePath;

    //get array of all visible levels (as values), beginning with the full data object and getting more specific
    var visibleLevels = getAllLevels(this.props.data,currentPath);

    //convert the levels from JS values to LevelColumn components
    visibleLevels = visibleLevels.map(function(levelContent,levelDepth){
      return (
        <LevelColumn data={levelContent} levelDepth={levelDepth} currentPath={currentPath} updatePath={updatePath}/>
      );
    });

    //draw all of the LevelColumn components:
    return (
      <div className="column-view">
        {visibleLevels}
      </div>
    );
  }
});

var LevelColumn = React.createClass({
  handleClick: function(e){
    if(e.target.className.search('disabled')<0 && e.target.className.search('key-row')>=0){
      this.props.updatePath(this.props.levelDepth,e.target.firstChild.nodeValue);
    }
  },

  render: function() {
    var keyRows = [];
    var levelDepth = this.props.levelDepth;
    var currentPath = this.props.currentPath;

    //if the column represents an object, print its keys as rows
    if (typeof this.props.data === 'object'){
      var markActive;

      //test if each entry is part of the currently selected path
      for (var key in this.props.data){
        markActive = false;
        if (currentPath[levelDepth] == key){
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

var KeyRow = React.createClass({
  render: function() {
    var disabledClass = (this.props.isDisabled ? 'disabled' : '');
    var activeClass = (this.props.isActive ? 'active': '');
    return (
      <a className={"list-group-item key-row "+disabledClass+activeClass}>
        {this.props.keyName}
      </a>
    );
  }
});

var LevelColumnCaption = React.createClass({
  render: function() {
    var caption=typeof this.props.data;
    if(Array.isArray(this.props.data)){
      caption="array";
    }
    if(!isNaN(this.props.data)){
      caption="number";
    }
    
    return (
      <div className="level-column-caption-container">
        <div className="level-column-caption">{caption}</div>
      </div>
    );
  }
});

var PathView = React.createClass({
  render: function() {
    var pathNames = this.props.currentPath.map(function(keyName){
      if(isNaN(keyName)){
        return '.'+keyName;
      } else {
        return '['+keyName+']';
      }
    });
    return (
      <div className="path-view">
        <div className="path-caption">Selected path:</div>
        <div className="current-path lead">{pathNames.join('')}</div>
      </div>
    );
  }
});

ReactDOM.render(
  <ExplorerApp />, document.getElementById('explorer-app')
);

// Helper functions:
function getAllLevels (data, path){
  var allLevels = [data];

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

