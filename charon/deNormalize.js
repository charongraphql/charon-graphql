const normalize = require('./normalize');
const { result } = require('./dummyData');

const deNormalize = (flatQuery, data) => {
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

  return graphqlFormatedQuery;
};

module.exports = { deNormalize, checkCache, getAllCachedData, getQueriedData };
// const flat = normalize(result);
// console.log('------------------');
// // console.log(JSON.stringify(deNormalizeAll(flat), null, 2));
// console.log('------------------');
// console.log(JSON.stringify(getQueriedData(flat, 'undefined:undefined'), null, 2));
