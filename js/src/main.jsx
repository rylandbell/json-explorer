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
const reduxStore = Redux.createStore(Reducers.explorerApp);
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
          const dataString = reduxStore.getState().textContent;
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
