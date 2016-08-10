(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');
var Helper = require('./helper.jsx');

//Displays a single property name for the chosen object or array
module.exports = function (_ref) {
  var propertyName = _ref.propertyName;
  var levelDepth = _ref.levelDepth;
  var isActive = _ref.isActive;
  var updatePath = _ref.updatePath;

  var activeClass = isActive ? 'active' : '';
  function handleClick() {
    updatePath(levelDepth, propertyName.toString());
  }

  return React.createElement(
    'a',
    { className: 'list-group-item property-row ' + activeClass, onClick: handleClick },
    propertyName.toString()
  );
};

},{"./helper.jsx":6,"react":"react"}],2:[function(require,module,exports){
'use strict';

var React = require('react');
var Helper = require('./helper.jsx');

var LevelColumn = require('./level-column.jsx');

//Container for all of the LevelColumns
module.exports = function (_ref) {
  var data = _ref.data;
  var currentPath = _ref.currentPath;
  var updatePath = _ref.updatePath;


  //get array of all visible levels, beginning with the full data object and getting more specific by traveling along currentPath
  var visibleLevels = Helper.getAllLevels(data, currentPath);

  //convert the levels from JS values to LevelColumn components
  visibleLevels = visibleLevels.map(function (levelContent, levelDepth) {
    return React.createElement(LevelColumn, { data: levelContent, levelDepth: levelDepth, currentPath: currentPath, updatePath: updatePath, key: levelDepth });
  });

  //draw all of the LevelColumn components:
  return React.createElement(
    'div',
    { className: 'column-view clearfix' },
    React.createElement(
      'div',
      { className: 'explorer-help-text ' + (!Helper.isNonEmpty(data) ? '' : 'hidden') },
      '...and then explore its nested structure in this pane.'
    ),
    visibleLevels
  );
};

},{"./helper.jsx":6,"./level-column.jsx":9,"react":"react"}],3:[function(require,module,exports){
'use strict';

var React = require('react');
var Helper = require('./helper.jsx');

//displays the JSON-encoded content of the chosen path, with whitespace for readability:
module.exports = function (_ref) {
  var data = _ref.data;
  var currentPath = _ref.currentPath;

  var displayedData = data;
  for (var i = 0; i < currentPath.length; i++) {
    displayedData = displayedData[currentPath[i]];
  }

  return React.createElement(
    'div',
    { className: 'content-pane ' + (Helper.isNonEmpty(data) ? '' : 'hidden') },
    React.createElement('br', null),
    React.createElement(
      'p',
      { className: 'help-text-small' },
      ' Contents of selected path: '
    ),
    React.createElement(
      'pre',
      null,
      JSON.stringify(displayedData, null, 2)
    )
  );
};

},{"./helper.jsx":6,"react":"react"}],4:[function(require,module,exports){
'use strict';

var React = require('react');
var Helper = require('./helper.jsx');

var InputPane = require('./input-pane.jsx');
var ExplorerPane = require('./explorer-pane.jsx');
var ContentPane = require('./content-pane.jsx');

module.exports = function (_ref) {
  var reduxState = _ref.reduxState;
  var handleTextChange = _ref.handleTextChange;
  var handleFormSubmit = _ref.handleFormSubmit;
  var updatePath = _ref.updatePath;
  return React.createElement(
    'div',
    { className: 'container ' },
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement(
        'div',
        { className: 'col-xs-12 col-md-12' },
        React.createElement(
          'p',
          { className: 'non-app-text' },
          'Don\'t have any JSON strings handy? ',
          React.createElement(
            'a',
            { href: '', 'data-toggle': 'modal', 'data-target': '#sample-strings' },
            'Click here'
          ),
          ' for a few samples to copy and paste.'
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'row main-app-row' },
      React.createElement(
        'div',
        { className: 'col-xs-12 col-md-4' },
        React.createElement(InputPane, { textContent: reduxState.textContent, handleTextChange: handleTextChange, handleFormSubmit: handleFormSubmit })
      ),
      React.createElement(
        'div',
        { className: 'col-xs-12 col-md-8' },
        React.createElement(ExplorerPane, { data: reduxState.data, currentPath: reduxState.currentPath, updatePath: updatePath })
      )
    ),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'error-msg alert alert-danger ' + (reduxState.showError ? '' : 'hidden'), role: 'alert' },
          'Sorry, but that doesn\'t appear to be a valid JSON string. Please try again.'
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement(
        'div',
        { className: 'col-xs-12' },
        React.createElement(ContentPane, { data: reduxState.data, currentPath: reduxState.currentPath })
      )
    )
  );
};

},{"./content-pane.jsx":3,"./explorer-pane.jsx":5,"./helper.jsx":6,"./input-pane.jsx":7,"react":"react"}],5:[function(require,module,exports){
'use strict';

var React = require('react');
var Helper = require('./helper.jsx');

var ColumnView = require('./column-view.jsx');
var PathView = require('./path-view.jsx');

//Contains all of the columns, captions, and path displays.
module.exports = function (_ref) {
  var data = _ref.data;
  var currentPath = _ref.currentPath;
  var updatePath = _ref.updatePath;
  return React.createElement(
    'div',
    { className: 'explorer-pane' },
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement(
        'div',
        { className: 'col-xs-12' },
        React.createElement(ColumnView, { data: data, currentPath: currentPath, updatePath: updatePath })
      )
    ),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement(
        'div',
        { className: 'col-xs-12' },
        React.createElement(PathView, { currentPath: currentPath, data: data })
      )
    )
  );
};

},{"./column-view.jsx":2,"./helper.jsx":6,"./path-view.jsx":11,"react":"react"}],6:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

//-------------------- Helper functions: --------------------

//returns an array of objects, getting iteratively finer as it traces the given path
module.exports.getAllLevels = function (data, path) {
  if (Object.keys(data).length === 0 && data.constructor === Object) {
    var allLevels = [];
  } else {
    var allLevels = [data];
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
  var type = typeof data === 'undefined' ? 'undefined' : _typeof(data);
  if (Array.isArray(data)) {
    type = 'array';
  }

  if (!isNaN(data) && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object' && typeof data !== 'boolean') {
    type = 'number';
  }

  return type;
};

//converts the arrays used to represent paths in state to a JS-valid path string.
module.exports.pathArrayToString = function (pathArray) {
  return pathArray.map(function (propertyName) {
    if (isNaN(propertyName)) {
      return '.' + propertyName;
    } else {
      return '[' + propertyName + ']';
    }
  }).join('');
};

},{}],7:[function(require,module,exports){
'use strict';

var React = require('react');
var Helper = require('./helper.jsx');

//Contains the text input and left 1/3 of the app
module.exports = function (_ref) {
  var textContent = _ref.textContent;
  var handleTextChange = _ref.handleTextChange;
  var handleFormSubmit = _ref.handleFormSubmit;
  return React.createElement(
    'div',
    { className: 'input-pane' },
    React.createElement(
      'form',
      { action: '', onSubmit: handleFormSubmit },
      React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement('textarea', { className: 'form-control', rows: '15', value: textContent, onChange: handleTextChange, placeholder: 'Paste a JSON string here (without any surrounding quote marks)...' }),
        React.createElement('input', { className: 'btn btn-primary', id: 'btn-data-submit', type: 'submit', value: 'Go!' })
      )
    )
  );
};

},{"./helper.jsx":6,"react":"react"}],8:[function(require,module,exports){
'use strict';

var React = require('react');
var Helper = require('./helper.jsx');

//assign a caption depending on the type of the value represented in the column
module.exports = function (_ref) {
  var data = _ref.data;
  return React.createElement(
    'div',
    { className: 'level-column-caption-container' },
    React.createElement(
      'div',
      { className: 'level-column-caption' },
      Helper.getType(data)
    )
  );
};

},{"./helper.jsx":6,"react":"react"}],9:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var React = require('react');
var Helper = require('./helper.jsx');

var ClickablePropertyRow = require('./clickable-property-row.jsx');
var TerminalPropertyRow = require('./terminal-property-row.jsx');
var LevelColumnCaption = require('./level-column-caption.jsx');

//Column with all properties for a single level in the current path
module.exports = function (_ref) {
  var data = _ref.data;
  var currentPath = _ref.currentPath;
  var levelDepth = _ref.levelDepth;
  var updatePath = _ref.updatePath;

  var propertyRows = [];

  //if the column represents an object, print its properties as rows
  if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
    var markActive;

    //test if each entry is part of the currently selected path
    var keyCounter = 0;
    for (var property in data) {
      markActive = false;
      if (currentPath[levelDepth] == property) {
        markActive = true;
      }

      propertyRows.push(React.createElement(ClickablePropertyRow, { propertyName: property, levelDepth: levelDepth, isActive: markActive, updatePath: updatePath, key: keyCounter }));
      keyCounter++;
    }

    //for non-object columns, just print the value as a single, click-disabled row
  } else {
    propertyRows.push(React.createElement(TerminalPropertyRow, { propertyName: data, key: 0 }));
  }

  return React.createElement(
    'div',
    { className: 'level-column' },
    React.createElement(
      'div',
      { className: 'list-group' },
      propertyRows
    ),
    React.createElement(LevelColumnCaption, { data: data })
  );
};

},{"./clickable-property-row.jsx":1,"./helper.jsx":6,"./level-column-caption.jsx":8,"./terminal-property-row.jsx":12,"react":"react"}],10:[function(require,module,exports){
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Redux = require('redux');
var expect = require('expect');

var ExplorerApp = require('./explorer-app.jsx');
var Helper = require('./helper.jsx');

// Reducer:

var defaultState = {
  data: {},
  currentPath: [],
  showError: false,
  textContent: ''
};

var stateReducer = function stateReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? defaultState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'UPDATE_DATA':
      state.data = action.data;
      return state;
    case 'TEXT_ENTRY':
      state.textContent = action.textContent;
      return state;
    case 'SHOW_ERROR':
      state.showError = true;
      return state;
    case 'HIDE_ERROR':
      state.showError = false;
      return state;
    case 'UPDATE_PATH':
      state.currentPath = state.currentPath.slice(0, action.level);
      if (action.newProperty) {
        state.currentPath = state.currentPath.concat([action.newProperty]);
      }

      return state;
    default:
      return state;
  }
};

var reduxStore = Redux.createStore(stateReducer);
reduxStore.subscribe(render);
render();

function render() {
  ReactDOM.render(React.createElement(ExplorerApp, {
    reduxState: reduxStore.getState(),
    handleTextChange: function handleTextChange(e) {
      e.preventDefault();
      reduxStore.dispatch({
        type: 'TEXT_ENTRY',
        textContent: e.target.value
      });
    },
    updatePath: function updatePath(level, newProperty) {
      reduxStore.dispatch({
        type: 'UPDATE_PATH',
        level: level,
        newProperty: newProperty
      });
    },
    handleFormSubmit: function handleFormSubmit(e) {
      e.preventDefault();
      var dataString = reduxStore.getState().textContent;
      reduxStore.dispatch({ type: 'HIDE_ERROR' });
      reduxStore.dispatch({ type: 'UPDATE_PATH', level: 0 });
      try {
        reduxStore.dispatch({ type: 'UPDATE_DATA', data: JSON.parse(dataString) });
      } catch (err) {
        reduxStore.dispatch({ type: 'SHOW_ERROR' });
        reduxStore.dispatch({ type: 'UPDATE_DATA', data: {} });
      }
    }
  }), document.getElementById('explorer-app'));
}

},{"./explorer-app.jsx":4,"./helper.jsx":6,"expect":"expect","react":"react","react-dom":"react-dom","redux":"redux"}],11:[function(require,module,exports){
'use strict';

var React = require('react');
var Helper = require('./helper.jsx');

//Displays the path string needed to reference the chosen path:
module.exports = function (_ref) {
  var data = _ref.data;
  var currentPath = _ref.currentPath;


  //Show appropriate helpText message, depending on if path is empty:
  var helpText = 'Click on a row to view its contents.';
  if (currentPath.length > 0) {
    helpText = 'Selected path: ';
  }

  return React.createElement(
    'div',
    { className: 'path-view' },
    React.createElement(
      'div',
      { className: 'help-text-small ' + (Helper.isNonEmpty(data) ? '' : 'hidden') },
      helpText
    ),
    React.createElement(
      'div',
      { className: 'current-path lead' },
      Helper.pathArrayToString(currentPath)
    )
  );
};

},{"./helper.jsx":6,"react":"react"}],12:[function(require,module,exports){
'use strict';

var React = require('react');
var Helper = require('./helper.jsx');

//Displays a value for non-objects at the end of the tree; is not clickable
module.exports = function (_ref) {
  var propertyName = _ref.propertyName;
  var isActive = _ref.isActive;
  return React.createElement(
    'a',
    { className: 'list-group-item property-row disabled' },
    propertyName.toString()
  );
};

},{"./helper.jsx":6,"react":"react"}]},{},[10]);
