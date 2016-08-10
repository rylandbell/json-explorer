var React = require('react');
var Helper = require('./helper.jsx');

//Displays a value for non-objects at the end of the tree; is not clickable
module.exports = ({ propertyName, isActive }) => (

    <a className={'list-group-item property-row disabled'}>
      {propertyName.toString()}
    </a>

);
