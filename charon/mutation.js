const normalize = require('./normalize');
const { addedData } = require('./dummyData');

// assume that denormalize function can grab a section of normalize data.
// take the denormalized data, insert the new data, normalize it and reinsert (object.assign)
const cache = {};
const checkReferencesAndUpdate = () => {};

const addMutation = data => {
  console.log(data);
  const normal = normalize({ data });
  console.log(normal);

  // keep all the referenced keys created
  // search through the cache to look for referened keys INSIDE the object
  // if object referenced has a referenece to the 'root added query' then \
  // push if its an array(or list)

  Object.assign(cache, normal);
  checkReferencesAndUpdate(cache);
};

addMutation(addedData);
