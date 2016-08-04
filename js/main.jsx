var fudge = JSON.parse('{"name":"Ryland","age":34,"cities":["Portland","Eugene"],"myObj":{"magic":35}}');
var initialPath = ['cities',0];

var JSONExplorer = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-8">
            <ColumnView data={this.props.data} currentPath={this.props.currentPath}/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8">
            <PathView currentPath={this.props.currentPath}/>
          </div>
        </div>
      </div>
    );
  }
});

var ColumnView = React.createClass({
  render: function() {
    var currentPath = this.props.currentPath;

    //get array of all visible levels (as values), beginning with the full data object and getting more specific
    var visibleLevels = getAllLevels(this.props.data,currentPath);

    //convert the levels from JS values to LevelColumn components
    visibleLevels = visibleLevels.map(function(levelContent,levelDepth){
      return (
        <LevelColumn data={levelContent} levelDepth={levelDepth} currentPath={currentPath}/>
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
      <div className="level-column">
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
    return (
      <a className={
        "list-group-item key-row "
        +(this.props.isDisabled ? 'disabled' : '')
        +(this.props.isActive ? 'active' : '')}
      >{this.props.keyName}</a>
    );
  }
});

var LevelColumnCaption = React.createClass({
  render: function() {
    var caption=typeof this.props.data;
    if(Array.isArray(this.props.data)){
      caption="array";
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
    return (
      <div className="path-view">
        <div className="path-caption">Current path:</div>
        <div className="current-path lead">{this.props.currentPath.join('.')}</div>
      </div>
    );
  }
});

ReactDOM.render(
  <JSONExplorer data={fudge} currentPath={initialPath}/>, document.getElementById('app-container')
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
  addLevelAndChildren (data,path);

  return allLevels;
}

