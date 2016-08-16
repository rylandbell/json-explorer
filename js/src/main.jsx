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

var ExplorerApp = require('./explorer-app.jsx');

// Reducer:
var stateReducer = (state = { data: {}, currentPath: [], showError: false, textContent: '' }, action) => {
  switch (action.type){
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
      state.currentPath = (state.currentPath).slice(0, action.level);
      if (action.newProperty) {
        state.currentPath = (state.currentPath).concat([action.newProperty]);
      }

      return state;
    case 'RESET_STATE':
      state = {
        data: {},
        currentPath: [],
        showError: false,
        textContent: ''
      };
      return state;
    default:
      return state;
  }
};

//create a store from the above reducer, then subscribe a React render function to it
var reduxStore = Redux.createStore(stateReducer);
reduxStore.subscribe(render);
render();

//React render function, with callbacks
function render() {
  ReactDOM.render(
    <ExplorerApp
      reduxState = {reduxStore.getState()}
      handleTextChange = {
        (e) => {
          e.preventDefault();
          reduxStore.dispatch({
            type: 'TEXT_ENTRY',
            textContent: e.target.value
          });
        }
      }
      updatePath = {
        (level, newProperty) => {
          reduxStore.dispatch({
            type: 'UPDATE_PATH',
            level: level,
            newProperty: newProperty
          });
        }
      }
      handleFormSubmit = {
        (e) => {
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
      }
      resetState = {
        (e) => {
          e.preventDefault();
          reduxStore.dispatch({ type: 'RESET_STATE' });
        }
      }
    />,
    document.getElementById('explorer-app')
  );
}

//wait for background image to load before displaying it:
$(document).ready(function () {
  $('body').css('backgroundImage', 'url(../images/footer_lodyas.png)');
});
