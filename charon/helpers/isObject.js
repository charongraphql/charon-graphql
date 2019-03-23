module.exports = function isObject(val) {
  return val instanceof Object && val.constructor === Object;
};
