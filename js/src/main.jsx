var React = require('react');

var React = require('react');
var ReactDOM = require('react-dom');
var Redux = require('redux');

var ExplorerApp = require('./explorer-app.jsx');
var Helper = require('./helper.jsx');

// All Redux in this file

var _createStore = Redux.createStore;

var defaultState = {
  data: {},
  currentPath: [],
  showError: false,
  textContent: ''
};

var reduxReducer = (state = defaultState,action) => {
  switch(action.type){
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
      state.currentPath = (state.currentPath).slice(0,action.level);
      if(action.newKey){
        state.currentPath = (state.currentPath).concat([action.newKey]);
      }
      return state;
    default:
      return state;
  }
};

var reduxStore = _createStore(reduxReducer);

reduxStore.subscribe(render);

function render () {
  ReactDOM.render(
    <ExplorerApp 
      reduxState = {reduxStore.getState()}
      handleTextChange = {
        (e) => {
          e.preventDefault();
          reduxStore.dispatch({
            type:'TEXT_ENTRY', 
            textContent: e.target.value
          });
        }
      }
      updatePath = {
        (level,newKey) => {
          reduxStore.dispatch({
            type: 'UPDATE_PATH',
            level: level,
            newKey: newKey
          });
        }
      }
      handleFormSubmit = {
        (e) => {
          e.preventDefault();
          var dataString = reduxStore.getState().textContent;
          reduxStore.dispatch({type: 'HIDE_ERROR'});
          reduxStore.dispatch({type: 'UPDATE_PATH', level: 0});
          try {
            reduxStore.dispatch({type: 'UPDATE_DATA', data: JSON.parse(dataString)});
          } catch(err) {
            reduxStore.dispatch({type: 'SHOW_ERROR'});
            reduxStore.dispatch({type: 'UPDATE_DATA', data: {}});
          }
        }  
      }
    />, 
    document.getElementById('explorer-app')
  );
}

render();