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

// TODO: check if the query exists in the cache
const checkCache = (flatData, queryString) => {
  // need to handle if the query string doesnt exist
  // if it doesnt exist then find its charon key and iterate through cache
  // returns a boolean
};

const getAllCachedData = flatData => {
  const nestedData = {};

  Object.entries(flatData).forEach(([charonKey, queryBody]) => {
    // const field = cacheKey.toLowerCase().replace(/(:)(?<=:)\S+/g, 's');
    nestedData[charonKey] = deNormalize(queryBody, flatData);
  });

  return nestedData;
};

const getQueriedData = (flatData, queryString) => {
  const nestedData = {};
  if (flatData[queryString]) {
    // last worked on
    nestedData[queryString] = deNormalize(flatData[queryString], flatData);
  }
  // if not found then hit database
  return nestedData;
};

module.exports = { deNormalize, checkCache, getAllCachedData, getQueriedData };
// const flat = normalize(result);
// console.log('------------------');
// // console.log(JSON.stringify(deNormalizeAll(flat), null, 2));
// console.log('------------------');
// console.log(JSON.stringify(getQueriedData(flat, 'undefined:undefined'), null, 2));
