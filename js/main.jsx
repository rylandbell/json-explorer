var fudge = JSON.parse('{"name":"Ryland","age":34,"cities":["Portland","Eugene"],"myObj":{"magic":35}}');
var initialPath = ['cities',0];

var JSONExplorer = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-8">
            <ColumnView data={this.props.data} currentPathArray={this.props.currentPathArray}/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8">
            <PathView currentPathArray={this.props.currentPathArray}/>
          </div>
        </div>
      </div>
    );
  }
});

var ColumnView = React.createClass({
  render: function() {

    //get array of all visible levels (as values), beginning with the full data object and getting more specific
    var visibleLevels = getAllLevels(this.props.data,this.props.currentPathArray);

    //convert the levels from JS values to LevelColumn components
    visibleLevels = visibleLevels.map(function(level){
      return (
        <LevelColumn data={level} />
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

    //if the column represents an object, list its values as rows; otherwise, list its value
    if (typeof this.props.data === 'object'){
      for (var key in this.props.data){
        keyRows.push(<KeyRow keyName={key} />);
      }
    } else {
      keyRows.push(<KeyRow keyName={this.props.data} />);
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
      <div className="list-group-item key-row">{this.props.keyName}</div>
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
        <div className="current-path lead">{this.props.currentPathArray.join('.')}</div>
      </div>
    );
  }
});

ReactDOM.render(
  <JSONExplorer data={fudge} currentPathArray={initialPath}/>, document.getElementById('app-container')
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

