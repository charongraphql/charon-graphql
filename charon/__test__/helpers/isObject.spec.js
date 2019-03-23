const isObject = require('../../helpers/isObject');

test('object', () => {
  expect(isObject({})).toBe(true);
});

test('array', () => {
  expect(isObject([])).toBe(false);
});

test('null', () => {
  expect(isObject(null)).toBe(false);
});

test('undefined', () => {
  expect(isObject(undefined)).toBe(false);
});

test('NaN', () => {
  expect(isObject(NaN)).toBe(false);
});

test('number', () => {
  expect(isObject(3)).toBe(false);
});

test('string', () => {
  expect(isObject('string')).toBe(false);
});

test('set', () => {
  const set = new Set();
  expect(isObject(set)).toBe(false);
});
