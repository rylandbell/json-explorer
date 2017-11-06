//-------------------- Helper functions: --------------------

//returns an array of objects, getting iteratively finer as it traces the given path
module.exports.getAllLevels = function (data, path) {
  var allLevels;
  if (Object.keys(data).length === 0 && data.constructor === Object) {
    allLevels = [];
  } else {
    allLevels = [data];
  }

  function addLevelAndChildren(subData, subPath) {
    var nextProperty = subPath[0];
    allLevels.push(subData[nextProperty]);
    if (subPath.length > 1) {
      var newSubPath = subPath.slice(1);
      addLevelAndChildren(subData[nextProperty], newSubPath);
    }
  }

  if (path.length > 0) {
    addLevelAndChildren(data, path);
  }

  return allLevels;
};

//tests if an object has contents or is empty
module.exports.isNonEmpty = function (obj) {
  return !(Object.keys(obj).length === 0 && obj.constructor === Object);
};

module.exports.getType = function (data) {
  let type = typeof data;
  if (Array.isArray(data)) {
    type = 'array';
  } else if (!isNaN(data) && (typeof data !== 'object') && (typeof data !== 'boolean')) {
    type = 'number';
  } else if (data === null) {
    type = 'null';
  }

  return type;
};

//converts the arrays used to represent paths in state to a JS-valid path string.
module.exports.pathArrayToString = function (pathArray, useBracketNotation) {
  if (useBracketNotation) {
    return pathArray
      .map(function (propertyName) {
        if (isNaN(propertyName)) {
          return '["' + propertyName + '"]';
        } else {
          return '[' + propertyName + ']';
        }
      })
      .join('');
  } else {
    return pathArray
      .map(function (propertyName) {
        if (isNaN(propertyName)) {
          return '.' + propertyName;
        } else {
          return '[' + propertyName + ']';
        }
      })
      .join('');
  }
};
