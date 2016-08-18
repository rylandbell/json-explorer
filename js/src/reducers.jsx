module.exports.parentReducer = (state = { data: {}, currentPath: [], showError: false, textContent: '' }, action) => {
  switch (action.type){
    case 'UPDATE_DATA':
      return Object.assign({}, state, { data: action.data });
    case 'TEXT_ENTRY':
      return Object.assign({}, state, { textContent: action.textContent });
    case 'SHOW_ERROR':
      return Object.assign({}, state, { showError: true });
    case 'HIDE_ERROR':
      return Object.assign({}, state, { showError: false });
    case 'UPDATE_PATH':
      if (action.newProperty) {
        return Object.assign({}, state, {
          currentPath: state.currentPath
            .slice(0, action.level)
            .concat([action.newProperty])
        });
      } else {
        return Object.assign({}, state, {
          currentPath: state.currentPath
            .slice(0, action.level)
        });
      }

    case 'RESET_STATE':
      return {
        data: {},
        currentPath: [],
        showError: false,
        textContent: ''
      };
    default:
      return state;
  }
};
