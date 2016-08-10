var React = require('react');
var Helper = require('./helper.jsx');

//Displays a value for non-objects at the end of the tree; is not clickable
module.exports = ({ keyName, isActive }) => (

    <a className={'list-group-item key-row disabled'}>
      {keyName.toString()}
    </a>

);
