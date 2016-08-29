var React = require('react');
var Helper = require('./helper.jsx');

//displays the JSON-encoded content of the chosen path, with whitespace for readability:
module.exports = ({ reduxState }) => {
  let displayedData = Object.assign({}, reduxState.data);
  reduxState.currentPath.forEach((pathStep) => {
    displayedData = Object.assign({}, displayedData[pathStep]);
  });

  return (
    <div className={'content-pane ' + (Helper.isNonEmpty(reduxState.data) ? '' : 'hidden')}>
      <br />
      <p className='help-text-small'> Contents of selected path: </p>
      <pre>{JSON.stringify(displayedData, null, 2)}</pre>
    </div>
  );
};
