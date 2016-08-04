var JSONExplorer = React.createClass({
  render: function() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-md-8">
            <ColumnView />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8">
            <PathView />
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
        <LevelColumn />
      </div>
    );
  }
});

var LevelColumn = React.createClass({
  render: function() {
    return (
      <div className="level-column">
        <div className="list-group">
          <KeyRow />
        </div>
        <LevelColumnCaption />
      </div>
    );
  }
});

var KeyRow = React.createClass({
  render: function() {
    return (
      <div className="list-group-item key-row">One of this object's keys</div>
    );
  }
});

var LevelColumnCaption = React.createClass({
  render: function() {
    return (
      <div className="level-column-caption-container">
        <div className="level-column-caption">Object Type</div>
      </div>
    );
  }
});

var PathView = React.createClass({
  render: function() {
    return (
      <div className="path-view">
        <div className="path-caption">Current path:</div>
        <div className="current-path lead">.resources[1].name</div>
      </div>
    );
  }
});

ReactDOM.render(
  <JSONExplorer />,document.getElementById('app-container')
);
