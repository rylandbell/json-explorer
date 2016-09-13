(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');

//Displays a single property name for the chosen object or array
module.exports = function (_ref) {
  var propertyName = _ref.propertyName;
  var levelDepth = _ref.levelDepth;
  var isActive = _ref.isActive;
  var updatePath = _ref.updatePath;

  function handleClick() {
    updatePath(levelDepth, propertyName.toString());
  }

  return React.createElement(
    'a',
    { className: 'list-group-item property-row ' + (isActive ? 'active' : ''), onClick: handleClick },
    propertyName.toString()
  );
};

},{"react":"react"}],2:[function(require,module,exports){
'use strict';

var React = require('react');
var Helper = require('./helper.jsx');

var LevelColumn = require('./level-column.jsx');

//Container for all of the LevelColumns
module.exports = function (_ref) {
  var reduxState = _ref.reduxState;
  var updatePath = _ref.updatePath;
  return React.createElement(
    'div',
    { className: 'column-view clearfix' },
    React.createElement(
      'div',
      { className: 'explorer-help-text ' + (!Helper.isNonEmpty(reduxState.data) ? '' : 'hidden') },
      '...and then explore its nested structure in this pane.'
    ),
    React.createElement(
      'div',
      { className: 'explorer-help-text ' + (Helper.isNonEmpty(reduxState.data) && reduxState.currentPath.length === 0 ? '' : 'hidden') },
      'Click on any row to view its contents.'
    ),


    //get array of all visible levels, beginning with the full data object and getting more specific by traveling along currentPath, then
    //convert the levels from JS values to LevelColumn components
    Helper.getAllLevels(reduxState.data, reduxState.currentPath).map(function (levelContent, levelDepth) {
      return React.createElement(LevelColumn, { levelContent: levelContent, levelDepth: levelDepth, currentPath: reduxState.currentPath, updatePath: updatePath, key: levelDepth });
    })
  );
};

},{"./helper.jsx":7,"./level-column.jsx":10,"react":"react"}],3:[function(require,module,exports){
'use strict';

var React = require('react');
var Helper = require('./helper.jsx');

//displays the JSON-encoded content of the chosen path, with whitespace for readability:
module.exports = function (_ref) {
  var reduxState = _ref.reduxState;

  var displayedData = Object.assign({}, reduxState.data);
  reduxState.currentPath.forEach(function (pathStep) {
    displayedData = Object.assign({}, displayedData[pathStep]);
  });

  return React.createElement(
    'div',
    { className: 'content-pane ' + (Helper.isNonEmpty(reduxState.data) ? '' : 'hidden') },
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

},{"./helper.jsx":7,"react":"react"}],4:[function(require,module,exports){
'use strict';

var React = require('react');

//Contains all of the columns, captions, and path displays.
module.exports = function (_ref) {
  var reduxState = _ref.reduxState;
  return React.createElement(
    'div',
    { className: 'error-msg alert alert-danger ' + (reduxState.showError ? '' : 'hidden'), role: 'alert' },
    'Sorry, but that doesn\'t appear to be a valid JSON string. Please try again.'
  );
};

},{"react":"react"}],5:[function(require,module,exports){
'use strict';

var React = require('react');

var InputPane = require('./input-pane.jsx');
var ExplorerPane = require('./explorer-pane.jsx');
var ErrorDisplay = require('./error-display.jsx');
var ContentPane = require('./content-pane.jsx');

module.exports = function (_ref) {
  var reduxState = _ref.reduxState;
  var handleTextChange = _ref.handleTextChange;
  var handleFormSubmit = _ref.handleFormSubmit;
  var updatePath = _ref.updatePath;
  var resetState = _ref.resetState;
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
        React.createElement(InputPane, { reduxState: reduxState, handleTextChange: handleTextChange, handleFormSubmit: handleFormSubmit, resetState: resetState })
      ),
      React.createElement(
        'div',
        { className: 'col-xs-12 col-md-8' },
        React.createElement(ExplorerPane, { reduxState: reduxState, updatePath: updatePath })
      )
    ),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement(ErrorDisplay, { reduxState: reduxState })
    ),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement(
        'div',
        { className: 'col-xs-12' },
        React.createElement(ContentPane, { reduxState: reduxState })
      )
    )
  );
};

},{"./content-pane.jsx":3,"./error-display.jsx":4,"./explorer-pane.jsx":6,"./input-pane.jsx":8,"react":"react"}],6:[function(require,module,exports){
'use strict';

var React = require('react');

var ColumnView = require('./column-view.jsx');
var PathView = require('./path-view.jsx');

//Contains all of the columns, captions, and path displays.
module.exports = function (_ref) {
  var reduxState = _ref.reduxState;
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
        React.createElement(ColumnView, { reduxState: reduxState, updatePath: updatePath })
      )
    ),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement(
        'div',
        { className: 'col-xs-12' },
        React.createElement(PathView, { reduxState: reduxState })
      )
    )
  );
};

},{"./column-view.jsx":2,"./path-view.jsx":12,"react":"react"}],7:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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

},{}],8:[function(require,module,exports){
'use strict';

var React = require('react');
var ResetButton = require('./reset-button.jsx');

//Contains the text input and left 1/3 of the app
module.exports = function (_ref) {
  var reduxState = _ref.reduxState;
  var handleTextChange = _ref.handleTextChange;
  var handleFormSubmit = _ref.handleFormSubmit;
  var resetState = _ref.resetState;
  return React.createElement(
    'div',
    { className: 'input-pane' },
    React.createElement(
      'form',
      { action: '', onSubmit: handleFormSubmit },
      React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement('textarea', { className: 'form-control', rows: '15', value: reduxState.textContent, onChange: handleTextChange, placeholder: 'Paste a JSON string here (without any surrounding quote marks)...' }),
        React.createElement('input', { className: 'btn btn-primary', id: 'btn-data-submit', type: 'submit', value: 'Go!' }),
        React.createElement(ResetButton, { resetState: resetState, reduxState: reduxState }),
        React.createElement('div', { className: 'clearfix' })
      )
    )
  );
};

},{"./reset-button.jsx":14,"react":"react"}],9:[function(require,module,exports){
'use strict';

var React = require('react');
var Helper = require('./helper.jsx');

//assign a caption depending on the type of the value represented in the column
module.exports = function (_ref) {
  var levelContent = _ref.levelContent;
  return React.createElement(
    'div',
    { className: 'level-column-caption-container' },
    React.createElement(
      'div',
      { className: 'level-column-caption' },
      Helper.getType(levelContent)
    )
  );
};

},{"./helper.jsx":7,"react":"react"}],10:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var React = require('react');

var ClickablePropertyRow = require('./clickable-property-row.jsx');
var TerminalPropertyRow = require('./terminal-property-row.jsx');
var LevelColumnCaption = require('./level-column-caption.jsx');

//Column with all properties for a single level in the current path
module.exports = function (_ref) {
  var levelContent = _ref.levelContent;
  var currentPath = _ref.currentPath;
  var levelDepth = _ref.levelDepth;
  var updatePath = _ref.updatePath;

  var propertyRows = [];

  //if the column represents an object, print its properties as rows
  if ((typeof levelContent === 'undefined' ? 'undefined' : _typeof(levelContent)) === 'object') {
    var markActive;

    //test if each entry is part of the currently selected path
    var keyCounter = 0;
    for (var property in levelContent) {
      markActive = false;
      if (currentPath[levelDepth] == property) {
        markActive = true;
      }

      propertyRows.push(React.createElement(ClickablePropertyRow, { propertyName: property, levelDepth: levelDepth, isActive: markActive, updatePath: updatePath, key: keyCounter }));
      keyCounter++;
    }

    //for non-object columns, just print the value as a single, click-disabled row
  } else {
    propertyRows.push(React.createElement(TerminalPropertyRow, { propertyName: levelContent, key: 0 }));
  }

  return React.createElement(
    'div',
    { className: 'level-column' },
    React.createElement(
      'div',
      { className: 'list-group' },
      propertyRows
    ),
    React.createElement(LevelColumnCaption, { levelContent: levelContent })
  );
};

},{"./clickable-property-row.jsx":1,"./level-column-caption.jsx":9,"./terminal-property-row.jsx":15,"react":"react"}],11:[function(require,module,exports){
'use strict';

//React component hierarchy:
//
//ExplorerApp
//  -InputPane
//    -ResetButton
//  -ExplorerPane
//    -ColumnView
//      -[LevelColumn]
//        -[ClickablePropertyRow]
//        -TerminalPropertyRow
//        -LevelColumnCaption
//    -PathView
//  -ContentPane

var React = require('react');
var ReactDOM = require('react-dom');
var Redux = require('redux');

var Reducers = require('./reducers.jsx');
var ExplorerApp = require('./explorer-app.jsx');

//create a store from the above reducer, then subscribe a React render function to it
var reduxStore = Redux.createStore(Reducers.explorerApp);
reduxStore.subscribe(render);
render();

//React render function, with callbacks
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
    },
    resetState: function resetState(e) {
      e.preventDefault();
      reduxStore.dispatch({ type: 'RESET_STATE' });
    }
  }), document.getElementById('explorer-app'));
}

//wait for background image to load before displaying it:
// $(document).ready(function () {
//   $('body').css('backgroundImage', 'url(../images/footerlodyas.png)');
// });

},{"./explorer-app.jsx":5,"./reducers.jsx":13,"react":"react","react-dom":"react-dom","redux":"redux"}],12:[function(require,module,exports){
'use strict';

var React = require('react');
var Helper = require('./helper.jsx');

//Displays the path string needed to reference the chosen path:
module.exports = function (_ref) {
  var reduxState = _ref.reduxState;
  return React.createElement(
    'div',
    { className: 'path-view' },
    React.createElement(
      'div',
      { className: 'help-text-small ' + (Helper.isNonEmpty(reduxState.data) ? '' : 'hidden') },
      'Selected path:'
    ),
    React.createElement(
      'div',
      { className: 'current-path lead' },
      Helper.pathArrayToString(reduxState.currentPath)
    )
  );
};

},{"./helper.jsx":7,"react":"react"}],13:[function(require,module,exports){
'use strict';

var Redux = require('redux');

var data = function data() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'UPDATE_DATA':
      return Object.assign({}, action.data);
    case 'RESET_STATE':
      return {};
    default:
      return state;
  }
};

var currentPath = function currentPath() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'UPDATE_PATH':
      if (action.newProperty) {
        return state.slice(0, action.level).concat([action.newProperty]);
      } else {
        return state.slice(0, action.level);
      }

    case 'RESET_STATE':
      return {};
    default:
      return state;
  }
};

var textContent = function textContent() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'TEXT_ENTRY':
      return action.textContent;
    case 'RESET_STATE':
      return [];
    default:
      return state;
  }
};

var showError = function showError() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'SHOW_ERROR':
      return true;
    case 'HIDE_ERROR':
      return false;
    case 'RESET_STATE':
      return false;
    default:
      return state;
  }
};

module.exports.explorerApp = Redux.combineReducers({
  data: data,
  currentPath: currentPath,
  textContent: textContent,
  showError: showError
});

},{"redux":"redux"}],14:[function(require,module,exports){
'use strict';

var React = require('react');
var Helper = require('./helper.jsx');

module.exports = function (_ref) {
  var reduxState = _ref.reduxState;
  var resetState = _ref.resetState;
  return React.createElement(
    'button',
    { className: 'btn btn-primary pull-right ' + (Helper.isNonEmpty(reduxState.data) ? '' : 'hidden'), onClick: resetState },
    ' Reset'
  );
};

},{"./helper.jsx":7,"react":"react"}],15:[function(require,module,exports){
'use strict';

var React = require('react');

//Displays a value for non-objects at the end of the tree; is not clickable
module.exports = function (_ref) {
  var propertyName = _ref.propertyName;
  return React.createElement(
    'a',
    { className: 'list-group-item property-row disabled' },
    propertyName.toString()
  );
};

},{"react":"react"}]},{},[11]);
