module.exports = function parseQueryForFields(query) {
  const stripped = query
    .replace(/\s+/g, ' ')
    .match(/(?<= {.*){.*}(?=.*})/)[0]
    .match(/\S+/g);

  // iterate through arr from index one
  const nested = true;
  function createObjFromStripped(field, i = 0, obj = {}) {
    const temp = {};
    if (field[i] !== '{' && field[i + 1] !== '{') {
      temp[field[i]] = 1;
    }
    if (field[i] !== '{' && field[i + 1] === '{') {
      temp[field[i]] = {};
    }
    if (field[i] === '}') {
      Object.assign(obj, temp);
    }
  }
  return createObjFromStripped(stripped.slice(1, stripped.length));

  // return output;

  // if not a curly brace set element to output key
  // if open curly bracket
  // create an object for previous key's value
  // if reaches closing curly break out
  // return output
};
