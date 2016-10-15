var React = require('react');

var InputPane = require('./input-pane.jsx');
var ExplorerPane = require('./explorer-pane.jsx');
var ErrorDisplay = require('./error-display.jsx');
var ContentPane = require('./content-pane.jsx');

module.exports = ({ reduxState, handleTextChange, handleFormSubmit, updatePath, resetState }) => (
  <div className='container '>
    <div className='row'>
      <h1> JSON Navigator </h1>
    </div>
    <div className='row clearfix'>
      <p className='non-app-text pull-left'>Don't have any JSON strings handy? <a href='' data-toggle='modal' data-target='#sample-strings'>Click here</a> for a few samples to copy and paste.</p>
      <p className='pull-right'>
        <a href='https://github.com/rylandbell/json-navigator' target='_blank'>View project on GitHub</a>
      </p>
    </div>
    <div className='row main-app-row'>
      <div className='col-xs-12 col-md-4'>
        <InputPane reduxState={reduxState} handleTextChange={handleTextChange} handleFormSubmit={handleFormSubmit} resetState={resetState}/>
      </div> 
      <div className='col-xs-12 col-md-8'>
        <ExplorerPane reduxState={reduxState} updatePath= {updatePath} />
      </div>  
    </div>
    <div className='row'>
      <ErrorDisplay reduxState={reduxState} />
    </div>
    <div className='row'>
      <ContentPane reduxState={reduxState} />
    </div>
  </div>
);

