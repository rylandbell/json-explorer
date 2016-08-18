// var expect = require('expect');
// var deepFreeze = require('deep-freeze');
// // require('jsdom-global')();
// // var jsdom = require("jsdom");
// require('./testdom')('<html><body><div id="explorer-app"></div></body></html>');

// var Main = require('../js/src/main.jsx');

// describe('Redux Actions', function() {
//   it('UPDATE_DATA',function(){
//     var stateBefore = { data: {}, currentPath: [], showError: false, textContent: '' };
//     var testAction = { type: 'UPDATE_DATA', data: { testProp: 'testValue' } };
//     var stateAfter = { data: { testProp: 'testValue' }, currentPath: [], showError: false, textContent: '' };

//     deepFreeze(stateBefore);
//     deepFreeze(testAction);

//     expect(
//       Main.parentReducer(stateBefore, testAction)
//     ).toEqual(stateAfter);
//   });
// });

//tests
// function testUpdateData() {
//   var stateBefore = { data: {}, currentPath: [], showError: false, textContent: '' };
//   var testAction = { type: 'UPDATE_DATA', data: { testProp: 'testValue' } };
//   var stateAfter = { data: { testProp: 'testValue' }, currentPath: [], showError: false, textContent: '' };

//   deepFreeze(stateBefore);
//   deepFreeze(testAction);

//   expect(
//     app.parentReducer(stateBefore, testAction)
//   ).toEqual(stateAfter);
// }

// function testUpdatePath() {
//   var stateBefore = { data: {}, currentPath: [], showError: false, textContent: '' };
//   var testAction = {
//     type: 'UPDATE_PATH',
//     level: 0,
//     newProperty: 'newPathStep'
//   };
//   var stateAfter = { data: {}, currentPath: ['newPathStep'], showError: false, textContent: '' };

//   deepFreeze(stateBefore);
//   deepFreeze(testAction);

//   expect(
//     app.parentReducer(stateBefore, testAction)
//   ).toEqual(stateAfter);
// }

// testUpdateData();
// testUpdatePath();
