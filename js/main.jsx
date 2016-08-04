var fudge = JSON.parse('{"resource":"scoreboard","parameters":{"GameDate":"02/14/2015","LeagueID":"00","DayOffset":"0"},"resultSets":[{"name":"GameHeader","headers":["GAME_DATE_EST","GAME_SEQUENCE","GAME_ID","GAME_STATUS_ID","GAME_STATUS_TEXT","GAMECODE","HOME_TEAM_ID","VISITOR_TEAM_ID","SEASON","LIVE_PERIOD","LIVE_PC_TIME","NATL_TV_BROADCASTER_ABBREVIATION","LIVE_PERIOD_TIME_BCAST","WH_STATUS"],"rowSet":[]},{"name":"LineScore","headers":["GAME_DATE_EST","GAME_SEQUENCE","GAME_ID","TEAM_ID","TEAM_ABBREVIATION","TEAM_CITY_NAME","TEAM_WINS_LOSSES","PTS_QTR1","PTS_QTR2","PTS_QTR3","PTS_QTR4","PTS_OT1","PTS_OT2","PTS_OT3","PTS_OT4","PTS_OT5","PTS_OT6","PTS_OT7","PTS_OT8","PTS_OT9","PTS_OT10","PTS","FG_PCT","FT_PCT","FG3_PCT","AST","REB","TOV"],"rowSet":[]},{"name":"SeriesStandings","headers":["GAME_ID","HOME_TEAM_ID","VISITOR_TEAM_ID","GAME_DATE_EST","HOME_TEAM_WINS","HOME_TEAM_LOSSES","SERIES_LEADER"],"rowSet":[]},{"name":"LastMeeting","headers":["GAME_ID","LAST_GAME_ID","LAST_GAME_DATE_EST","LAST_GAME_HOME_TEAM_ID","LAST_GAME_HOME_TEAM_CITY","LAST_GAME_HOME_TEAM_NAME","LAST_GAME_HOME_TEAM_ABBREVIATION","LAST_GAME_HOME_TEAM_POINTS","LAST_GAME_VISITOR_TEAM_ID","LAST_GAME_VISITOR_TEAM_CITY","LAST_GAME_VISITOR_TEAM_NAME","LAST_GAME_VISITOR_TEAM_CITY1","LAST_GAME_VISITOR_TEAM_POINTS"],"rowSet":[]},{"name":"EastConfStandingsByDay","headers":["TEAM_ID","LEAGUE_ID","SEASON_ID","STANDINGSDATE","CONFERENCE","TEAM","G","W","L","W_PCT","HOME_RECORD","ROAD_RECORD"],"rowSet":[[1610612737,"00","22014","02/14/2015","East","Atlanta",54,43,11,0.796,"25-3","18-8"],[1610612761,"00","22014","02/14/2015","East","Toronto",53,36,17,0.679,"21-9","15-8"],[1610612741,"00","22014","02/14/2015","East","Chicago",54,34,20,0.63,"15-11","19-9"],[1610612764,"00","22014","02/14/2015","East","Washington",54,33,21,0.611,"20-8","13-13"],[1610612739,"00","22014","02/14/2015","East","Cleveland",55,33,22,0.6,"21-9","12-13"],[1610612749,"00","22014","02/14/2015","East","Milwaukee",53,30,23,0.566,"15-10","15-13"],[1610612766,"00","22014","02/14/2015","East","Charlotte",52,22,30,0.423,"13-15","9-15"],[1610612748,"00","22014","02/14/2015","East","Miami",52,22,30,0.423,"9-15","13-15"],[1610612751,"00","22014","02/14/2015","East","Brooklyn",52,21,31,0.404,"10-15","11-16"],[1610612738,"00","22014","02/14/2015","East","Boston",51,20,31,0.392,"12-15","8-16"],[1610612765,"00","22014","02/14/2015","East","Detroit",54,21,33,0.389,"10-18","11-15"],[1610612754,"00","22014","02/14/2015","East","Indiana",54,21,33,0.389,"11-14","10-19"],[1610612753,"00","22014","02/14/2015","East","Orlando",56,17,39,0.304,"7-18","10-21"],[1610612755,"00","22014","02/14/2015","East","Philadelphia",53,12,41,0.226,"7-19","5-22"],[1610612752,"00","22014","02/14/2015","East","New York",53,10,43,0.189,"7-19","3-24"]]},{"name":"WestConfStandingsByDay","headers":["TEAM_ID","LEAGUE_ID","SEASON_ID","STANDINGSDATE","CONFERENCE","TEAM","G","W","L","W_PCT","HOME_RECORD","ROAD_RECORD"],"rowSet":[[1610612744,"00","22014","02/14/2015","West","Golden State",51,42,9,0.824,"23-2","19-7"],[1610612763,"00","22014","02/14/2015","West","Memphis",53,39,14,0.736,"23-5","16-9"],[1610612745,"00","22014","02/14/2015","West","Houston",53,36,17,0.679,"18-8","18-9"],[1610612757,"00","22014","02/14/2015","West","Portland",53,36,17,0.679,"23-5","13-12"],[1610612742,"00","22014","02/14/2015","West","Dallas",55,36,19,0.655,"17-9","19-10"],[1610612746,"00","22014","02/14/2015","West","L.A. Clippers",54,35,19,0.648,"21-7","14-12"],[1610612759,"00","22014","02/14/2015","West","San Antonio",53,34,19,0.642,"20-7","14-12"],[1610612756,"00","22014","02/14/2015","West","Phoenix",54,29,25,0.537,"16-11","13-14"],[1610612760,"00","22014","02/14/2015","West","Oklahoma City",53,28,25,0.528,"16-8","12-17"],[1610612740,"00","22014","02/14/2015","West","New Orleans",53,27,26,0.509,"17-10","10-16"],[1610612743,"00","22014","02/14/2015","West","Denver",53,20,33,0.377,"12-14","8-19"],[1610612762,"00","22014","02/14/2015","West","Utah",53,19,34,0.358,"10-15","9-19"],[1610612758,"00","22014","02/14/2015","West","Sacramento",52,18,34,0.346,"11-17","7-17"],[1610612747,"00","22014","02/14/2015","West","L.A. Lakers",53,13,40,0.245,"7-18","6-22"],[1610612750,"00","22014","02/14/2015","West","Minnesota",53,11,42,0.208,"6-21","5-21"]]},{"name":"Available","headers":["GAME_ID","PT_AVAILABLE"],"rowSet":[]}]}');
// var initialPath = ['myObj','magic'];

var JsonExplorer = React.createClass({
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
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-8">
            <ColumnView data={this.props.data} currentPath={this.state.currentPath} updatePath={this.updatePath}/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8">
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
        <div className="path-caption">Current path:</div>
        <div className="current-path lead">{pathNames.join('')}</div>
      </div>
    );
  }
});

ReactDOM.render(
  <JsonExplorer data={fudge} />, document.getElementById('app-container')
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

