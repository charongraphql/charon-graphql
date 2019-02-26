module.exports = function parseQueryForTypename(query) {
  // console.log(query);
  const q = query.match(/(?<={\s*)\w+(?=\s*\()/);
  return q[0].charAt(0).toUpperCase() + q[0].slice(1);
};
