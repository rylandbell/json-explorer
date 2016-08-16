var React = require('react');
var Helper = require('./helper.jsx');

var LevelColumn = require('./level-column.jsx');

//Container for all of the LevelColumns
module.exports = ({ reduxState, updatePath }) => {

  //get array of all visible levels, beginning with the full data object and getting more specific by traveling along currentPath
  var visibleLevels = Helper.getAllLevels(reduxState.data, reduxState.currentPath);

  //convert the levels from JS values to LevelColumn components
  visibleLevels = visibleLevels.map(
    (levelContent, levelDepth) => (
      <LevelColumn levelContent={levelContent} levelDepth={levelDepth} currentPath={reduxState.currentPath} updatePath={updatePath} key={levelDepth} />
    )
  );

  //draw all of the LevelColumn components:
  return (
    <div className='column-view clearfix'>
      <div className={'explorer-help-text ' + (!Helper.isNonEmpty(reduxState.data) ? '' : 'hidden')}>...and then explore its nested structure in this pane.
      </div>
      {visibleLevels}
    </div>
  );
};

