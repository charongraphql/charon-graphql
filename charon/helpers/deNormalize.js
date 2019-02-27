module.exports = function deNormalize(flatQuery, data) {
  const graphqlFormatedQuery = {};

  Object.entries(flatQuery).forEach(([field, value]) => {
    if (Array.isArray(value)) {
      graphqlFormatedQuery[field] = [];

      value.forEach(el => {
        graphqlFormatedQuery[field].push(deNormalize(data[el], data));
      });
    } else if (data[value]) {
      graphqlFormatedQuery[field] = data[value].id;
    } else {
      graphqlFormatedQuery[field] = value;
    }
  });
  // data dynamic transformation

  return graphqlFormatedQuery;
};
