var React = require('react');

//Displays a value for non-objects at the end of the tree; is not clickable
module.exports = ({ propertyName }) => (
  <a className={'list-group-item property-row disabled'}>
    {propertyName.toString()}
  </a>
);
