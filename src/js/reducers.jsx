var Redux = require('redux');
var sampleData = require('./sample-data');

const data = (state={}, action) => {
  switch (action.type){
    case 'UPDATE_DATA':
      return Object.assign({}, action.data);
    case 'RESET_STATE':
      return {};
    default:
      return state;
  }
};

const currentPath = (state=[], action) => {
  switch (action.type){
    case 'UPDATE_PATH':
      if (action.newProperty) {
        return state.slice(0, action.level)
          .concat([action.newProperty]);
      } else {
        return state.slice(0, action.level);
      }

    case 'RESET_STATE':
      return [];
    default:
      return state;
  }
};

const textContent = (state='', action) => {
  switch (action.type){
    case 'TEXT_ENTRY':
      return action.textContent;
    case 'LOAD_SAMPLE_DATA':
      return sampleData;
    case 'RESET_STATE':
      return '';
    default:
      return state;
  }
};

const useBracketNotation = (state=false, action) => {
  switch (action.type) {
    case 'UPDATE_BRACKET_CHECKBOX':
      return !state;
    default:
      return state;
  }
}

const showError = (state=false, action) => {
  switch (action.type){
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

const dataIsPreloaded = (state = false, action) => {
  switch (action.type) {
    case 'PRELOAD_DATA':
      return true;
    default:
      return state;
  }
}

module.exports.explorerApp = Redux.combineReducers({
  data: data,
  currentPath: currentPath,
  textContent: textContent,
  useBracketNotation: useBracketNotation,
  showError: showError,
  dataIsPreloaded: dataIsPreloaded
});
