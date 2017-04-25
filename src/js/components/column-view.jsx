var React = require('react');
var CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');
var Helper = require('../helper.jsx');

var LevelColumn = require('./level-column.jsx');

//Container for all of the LevelColumns 
module.exports = ({ reduxState, updatePath }) => (
  <div className='column-view clearfix'>
    <div className={'explorer-help-text ' + (!Helper.isNonEmpty(reduxState.data) ? '' : 'hidden')}>...and then explore its nested structure in this pane.
    </div>
    <div className={'explorer-help-text ' + (Helper.isNonEmpty(reduxState.data) && reduxState.currentPath.length === 0 ? '' : 'hidden')}>Click on any row to view its contents.
    </div>
      {

        //get array of all visible levels, beginning with the full data object and getting more specific by traveling along currentPath, then
        //convert the levels from JS values to LevelColumn components
        Helper.getAllLevels(reduxState.data, reduxState.currentPath).map(
          (levelContent, levelDepth) => (
            <CSSTransitionGroup
              transitionName="level-column"
              transitionAppear={true}
              transitionAppearTimeout={300}
              transitionEnter={false}
              transitionLeave={true}
              transitionLeaveTimeout={300}>
              <LevelColumn levelContent={levelContent} levelDepth={levelDepth} currentPath={reduxState.currentPath} updatePath={updatePath} key={levelDepth} />
            </CSSTransitionGroup>
          )
        )
      }
  </div>
);

