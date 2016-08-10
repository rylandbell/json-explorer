var React = require('react');
var Helper = require('./helper.jsx');

//assign a caption depending on the type of the value represented in the column
module.exports = ({data}) => {
  return (
    <div className="level-column-caption-container">
      <div className="level-column-caption">{Helper.getType(data)}</div>
    </div>
  );
};