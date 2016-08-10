//-------------------- Helper functions: --------------------

//returns an array of objects, getting iteratively finer as it traces the given path
module.exports.getAllLevels = function (data, path) {
  if (Object.keys(data).length === 0 && data.constructor === Object) {
    var allLevels = [];
  } else {
    var allLevels = [data];
  }

  function addLevelAndChildren(subData, subPath) {
    var nextKey = subPath[0];
    allLevels.push(subData[nextKey]);
    if (subPath.length > 1) {
      var newSubPath = subPath.slice(1);
      addLevelAndChildren(subData[nextKey], newSubPath);
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
  var type = typeof data;
  if (Array.isArray(data)) {
    type = 'array';
  }

  if (!isNaN(data) && (typeof data !== 'object') && (typeof data !== 'boolean')) {
    type = 'number';
  }

  return type;
};

//converts the arrays used to represent paths in state to a JS-valid path string.
module.exports.pathArrayToString = function (pathArray) {
  return pathArray
    .map(function (keyName) {
      if (isNaN(keyName)) {
        return '.' + keyName;
      } else {
        return '[' + keyName + ']';
      }
    })
    .join('');
};
