
module.exports = function isOjbect(val) {
  return val instanceof Object && val.constructor === Object;
};
