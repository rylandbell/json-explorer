var fudge = JSON.parse('{"name":"Ryland","age":34,"cities":["Portland","Eugene"],"myObj":{"magic":35}}');

var JSONExplorer = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-8">
            <ColumnView data={this.props.data}/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8">
            <PathView curentPathArray={this.props.currentPathArray}/>
          </div>
        </div>
      </div>
    );
  }
});

var ColumnView = React.createClass({
  render: function() {
    return (
      <div className="column-view">
        <LevelColumn data={this.props.data} />
      </div>
    );
  }
});

var LevelColumn = React.createClass({
  render: function() {
    var keyRows = [];
    for (var key in this.props.data){
      keyRows.push(<KeyRow keyName={key} />);
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
        <div className="current-path lead">{this.props.curentPathArray.join('.')}</div>
      </div>
    );
  }
});

ReactDOM.render(
  <JSONExplorer data={fudge} currentPathArray={['scooby','doo']}/>,document.getElementById('app-container')
);
