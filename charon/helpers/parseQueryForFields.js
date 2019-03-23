module.exports = function parseQueryForFields(query) {
  const stripped = query
    .replace(/\s+/g, ' ')
    .match(/(?<= {.*){.*}(?=.*})/)[0]
    .match(/\S+/g);

  function helper(obj = {}, i = 0, j = stripped.length) {
    if (i === j) return obj;
    if (stripped[i] === '{') {
      j -= 1;
      if (stripped[j] === '}') {
        if (stripped[i - 1] === undefined) {
          return Object.assign(obj, helper({}, i + 1, j));
        }
        if (stripped[i - 1] !== '{') {
          obj[stripped[i - 1]] = [Object.assign({}, helper({}, i + 1, j))];
          return obj;
        }
      }
    }
    if (stripped[i] !== '{') {
      obj[stripped[i]] = 1;
      return Object.assign(obj, helper({}, i + 1, j));
    }
  }

  return helper();
};
