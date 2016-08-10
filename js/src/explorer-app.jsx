var React = require('react');
var Helper = require('./helper.jsx');

var InputPane = require('./input-pane.jsx');
var ExplorerPane = require('./explorer-pane.jsx');
var ContentPane = require('./content-pane.jsx');

module.exports = ({ reduxState, handleTextChange, handleFormSubmit, updatePath }) => (
  <div className='container '>
    <div className='row'>
      <div className='col-xs-12 col-md-12'>
        <p className='non-app-text'>Don't have any JSON strings handy? <a href='' data-toggle='modal' data-target='#sample-strings'>Click here</a> for a few samples to copy and paste.</p>
      </div>
    </div>
    <div className='row main-app-row'>
      <div className='col-xs-12 col-md-4'>
        <InputPane textContent={reduxState.textContent} handleTextChange={handleTextChange} handleFormSubmit={handleFormSubmit}/>
      </div> 
      <div className='col-xs-12 col-md-8'>
        <ExplorerPane data= {reduxState.data} currentPath= {reduxState.currentPath} updatePath= {updatePath} />
      </div>  
    </div>
    <div className='row'>
      <div>
        <div className={'error-msg alert alert-danger ' + (reduxState.showError ? '' : 'hidden')} role='alert'>Sorry, but that doesn't appear to be a valid JSON string. Please try again.</div>
      </div>
    </div>
    <div className='row'>
      <div className='col-xs-12'>
        <ContentPane data= {reduxState.data} currentPath= {reduxState.currentPath} />
      </div>
    </div>
  </div>
);

