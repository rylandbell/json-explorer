var expect = require('expect');
var deepFreeze = require('deep-freeze');

var Helper = require('../js/src/helper.jsx');

describe('Helper functions', function () {
  describe('isNonEmpty', function () {
    it('should return false for an empty object', function () {
      var testInput = {};
      deepFreeze(testInput);
      expect(Helper.isNonEmpty(testInput)).toEqual(false);
    });

    it('should return true for a string', function () {
      var testInput = 'abc';
      deepFreeze(testInput);
      expect(Helper.isNonEmpty(testInput)).toEqual(true);
    });

    it('should return true for a boolean', function () {
      var testInput = false;
      deepFreeze(testInput);
      expect(Helper.isNonEmpty(testInput)).toEqual(true);
    });

    it('should return true for a non-empty object', function () {
      var testInput = { keyName: 'value' };
      deepFreeze(testInput);
      expect(Helper.isNonEmpty(testInput)).toEqual(true);
    });
  });

  describe('getType', function () {
    it('should correctly identify a number', function () {
      var testInput = 0;
      var expectedOutput = 'number';
      deepFreeze(testInput);
      expect(Helper.getType(testInput)).toEqual(expectedOutput);
    });

    it('should correctly identify a string', function () {
      var testInput = 'abc';
      var expectedOutput = 'string';
      deepFreeze(testInput);
      expect(Helper.getType(testInput)).toEqual(expectedOutput);
    });

    it('should correctly identify a boolean', function () {
      var testInput = true;
      var expectedOutput = 'boolean';
      deepFreeze(testInput);
      expect(Helper.getType(testInput)).toEqual(expectedOutput);
    });

    it('should correctly identify an array', function () {
      var testInput = [1, 2, 3];
      var expectedOutput = 'array';
      deepFreeze(testInput);
      expect(Helper.getType(testInput)).toEqual(expectedOutput);
    });

    it('should correctly identify an object', function () {
      var testInput = { testKey: 'testValue' };
      var expectedOutput = 'object';
      deepFreeze(testInput);
      expect(Helper.getType(testInput)).toEqual(expectedOutput);
    });
  });

  describe('pathArrayToString', function () {
    it('should join strings with a \'.\' before each element', function () {
      var testInput = ['abc', 'def', 'ghi'];
      var expectedOutput = '.abc.def.ghi';
      deepFreeze(testInput);
      expect(Helper.pathArrayToString(testInput)).toEqual(expectedOutput);
    });

    it('should surround numbers with brackets', function () {
      var testInput = ['abc', 1, 2];
      var expectedOutput = '.abc[1][2]';
      deepFreeze(testInput);
      expect(Helper.pathArrayToString(testInput)).toEqual(expectedOutput);
    });
  });

  describe('getAllLevels', function () {
    it('should return an array with length equal to one plus the length of the path argument', function () {
      var testDataInput = { abc: { ghi: 'lmnop' } };
      var testPathInput = ['abc', 'ghi'];
      deepFreeze(testPathInput);
      deepFreeze(testDataInput);
      expect(Helper.getAllLevels(testDataInput, testPathInput).length).toEqual(testPathInput.length + 1);
    });

    it('should return an array with first entry equal to the data argument', function () {
      var testDataInput = { abc: { ghi: 'lmnop' } };
      var testPathInput = ['abc', 'ghi'];
      deepFreeze(testPathInput);
      deepFreeze(testDataInput);
      expect(Helper.getAllLevels(testDataInput, testPathInput)[0]).toEqual(testDataInput);
    });
  });
});
