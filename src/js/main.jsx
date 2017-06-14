var React = require('react');
var ReactDOM = require('react-dom');
var Redux = require('redux');

var Reducers = require('./reducers.jsx');
var ExplorerApp = require('./components/explorer-app.jsx');

//create a store from the above reducer, then subscribe a React render function to it
const reduxStore = Redux.createStore(Reducers.explorerApp);
reduxStore.subscribe(render);
render();

//If the app was opened from the command line with a user-selected JSON file, populate the Redux store with this data on page load.
injectPreloadedData();

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
      loadSampleData = {
        (e) => {
          e.preventDefault();
          console.log('click');
          reduxStore.dispatch({ type: 'LOAD_SAMPLE_DATA' })
        }
      }
    />,
    document.getElementById('explorer-app')
  );
}

function injectPreloadedData() {
  if (typeof preloadedUserData !== 'undefined') {
    try {
      reduxStore.dispatch({ type: 'UPDATE_DATA', data: JSON.parse(preloadedUserData) });
      reduxStore.dispatch({ type: 'TEXT_ENTRY', textContent: preloadedUserData });
      reduxStore.dispatch({ type: 'PRELOAD_DATA' });
    } catch (err) {
      reduxStore.dispatch({ type: 'SHOW_ERROR' });
      reduxStore.dispatch({ type: 'UPDATE_DATA', data: {} });
    }
  }
  return;
}
