const normalize = require('./normalize');
const { addedData } = require('./dummyData');

// assume that denormalize function can grab a section of normalize data.
// take the denormalized data, insert the new data, normalize it and reinsert (object.assign)

const addMutation = data => {
  console.log(data);
  const normal = normalize({ data });
  console.log(normal);
};

addMutation(addedData);
