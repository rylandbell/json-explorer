var React = require('react');
var Helper = require('./helper.jsx');

var ColumnView = require('./column-view.jsx');
var PathView = require('./path-view.jsx');

//Contains all of the columns, captions, and path displays.
module.exports = ({ data, currentPath, updatePath }) => (
  <div className='explorer-pane'>
    <div className='row'>
      <div className='col-xs-12'>
        <ColumnView data={data} currentPath={currentPath} updatePath={updatePath} />
      </div>
    </div>
    <div className='row'>
      <div className='col-xs-12'>
        <PathView currentPath={currentPath} data={data}/>
      </div>
    </div>
  </div>
);

