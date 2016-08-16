var React = require('react');

var ColumnView = require('./column-view.jsx');
var PathView = require('./path-view.jsx');

//Contains all of the columns, captions, and path displays.
module.exports = ({ reduxState, updatePath }) => (
  <div className='explorer-pane'>
    <div className='row'>
      <div className='col-xs-12'>
        <ColumnView reduxState={reduxState} updatePath={updatePath} />
      </div>
    </div>
    <div className='row'>
      <div className='col-xs-12'>
        <PathView reduxState={reduxState}/>
      </div>
    </div>
  </div>
);

