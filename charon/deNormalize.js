
export const reconstructQuery = (flatQuery, data) => {
  const graphqlFormatedQuery = {};

  Object.entries(flatQuery).forEach(([field, value]) => {
    if (Array.isArray(value)) {
      graphqlFormatedQuery[field] = [];

      value.forEach((el) => {
        graphqlFormatedQuery[field].push(
          reconstructQuery(data[el], data)
        );
      });
    } else if (data[value]) {
      graphqlFormatedQuery[field] = data[value].id;
    } else {
      graphqlFormatedQuery[field] = value;
    }
  });

  return graphqlFormatedQuery;
};


export const deNormalize = (flatData) => {
  const nestedData = {};

  Object.entries(flatData).forEach(([cacheKey, queryBody]) => {  
    const field = cacheKey.toLowerCase().replace(/(:)(?<=:)\S+/g, 's');

    nestedData[field] = reconstructQuery(queryBody, flatData);
  });

  return nestedData;
};