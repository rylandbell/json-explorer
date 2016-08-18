var expect = require('expect');
var deepFreeze = require('deep-freeze');

var Reducers = require('../js/src/reducers.jsx');

describe('parentReducer action handling', function () {
  describe('action type: UPDATE_DATA', function () {
    it('should add data to initial state', function () {
      var stateBefore = { data: {}, currentPath: [], showError: false, textContent: '' };
      var testAction = { type: 'UPDATE_DATA', data: { testProp: 'testValue' } };
      var stateAfter = { data: { testProp: 'testValue' }, currentPath: [], showError: false, textContent: '' };

      deepFreeze(stateBefore);
      deepFreeze(testAction);

      expect(
        Reducers.parentReducer(stateBefore, testAction)
      ).toEqual(stateAfter);
    });

    it('should return to initial state when empty data is submitted', function () {
      var stateBefore = { data: { testProp: 'testValue' }, currentPath: [], showError: false, textContent: '' };
      var testAction = { type: 'UPDATE_DATA', data: {} };
      var stateAfter = { data: {}, currentPath: [], showError: false, textContent: '' };

      deepFreeze(stateBefore);
      deepFreeze(testAction);

      expect(
        Reducers.parentReducer(stateBefore, testAction)
      ).toEqual(stateAfter);
    });

    it('should replace old data with newly submitted data', function () {
      var stateBefore = { data: { testProp: 'testValue' }, currentPath: [], showError: false, textContent: '' };
      var testAction = { type: 'UPDATE_DATA', data: { testProp: 'newTestValue', newTestProp: 'abc' } };
      var stateAfter = { data: { testProp: 'newTestValue', newTestProp: 'abc' }, currentPath: [], showError: false, textContent: '' };

      deepFreeze(stateBefore);
      deepFreeze(testAction);

      expect(
        Reducers.parentReducer(stateBefore, testAction)
      ).toEqual(stateAfter);
    });
  });

  describe('action type: UPDATE_PATH', function () {
    it('should replace an empty path with a one-step path', function () {
      var stateBefore = { data: {}, currentPath: [], showError: false, textContent: '' };
      var testAction = {
        type: 'UPDATE_PATH',
        level: 0,
        newProperty: 'newPathStep'
      };
      var stateAfter = { data: {}, currentPath: ['newPathStep'], showError: false, textContent: '' };

      deepFreeze(stateBefore);
      deepFreeze(testAction);

      expect(
        Reducers.parentReducer(stateBefore, testAction)
      ).toEqual(stateAfter);
    });

    it('should keep {level} steps from an existing path, and add one more step', function () {
      var stateBefore = { data: {}, currentPath: ['step1', 'step2', 'step3'], showError: false, textContent: '' };
      var testAction = {
        type: 'UPDATE_PATH',
        level: 1,
        newProperty: 'newPathStep'
      };

      deepFreeze(stateBefore);
      deepFreeze(testAction);

      expect(
        Reducers.parentReducer(stateBefore, testAction).currentPath.length
      ).toEqual(2);
      expect(
        Reducers.parentReducer(stateBefore, testAction).currentPath[1]
      ).toEqual('newPathStep');
    });
  });

  describe('action type: TEXT_ENTRY', function () {
    it('should replace state\'s textContent with action\'s textContent', function () {
      var stateBefore = { data: {}, currentPath: [], showError: false, textContent: 'abc' };
      var testAction = {
        type: 'TEXT_ENTRY',
        textContent: 'def'
      };
      var stateAfter = { data: {}, currentPath: [], showError: false, textContent: 'def' };

      deepFreeze(stateBefore);
      deepFreeze(testAction);

      expect(
        Reducers.parentReducer(stateBefore, testAction)
      ).toEqual(stateAfter);
    });
  });

  describe('action type: SHOW_ERROR', function () {
    it('should replace state\'s showError with true', function () {
      var stateBefore = { data: {}, currentPath: [], showError: false, textContent: '' };
      var testAction = {
        type: 'SHOW_ERROR'
      };
      var stateAfter = { data: {}, currentPath: [], showError: true, textContent: '' };

      deepFreeze(stateBefore);
      deepFreeze(testAction);

      expect(
        Reducers.parentReducer(stateBefore, testAction)
      ).toEqual(stateAfter);
    });
  });

  describe('action type: HIDE_ERROR', function () {
    it('should replace state\'s showError with false', function () {
      var stateBefore = { data: {}, currentPath: [], showError: true, textContent: '' };
      var testAction = {
        type: 'HIDE_ERROR'
      };
      var stateAfter = { data: {}, currentPath: [], showError: false, textContent: '' };

      deepFreeze(stateBefore);
      deepFreeze(testAction);

      expect(
        Reducers.parentReducer(stateBefore, testAction)
      ).toEqual(stateAfter);
    });
  });

  describe('action type: RESET_STATE', function () {
    it('should return the initial state', function () {
      var stateBefore = { data: {}, currentPath: [], showError: true, textContent: 'abc' };
      var testAction = {
        type: 'RESET_STATE'
      };
      var stateAfter = { data: {}, currentPath: [], showError: false, textContent: '' };

      deepFreeze(stateBefore);
      deepFreeze(testAction);

      expect(
        Reducers.parentReducer(stateBefore, testAction)
      ).toEqual(stateAfter);
    });
  });
});
