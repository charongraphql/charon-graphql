/* eslint-disable no-underscore-dangle, no-param-reassign */
const result = require('./dummyData');

console.log('\n');


/*
  uniqueSchemaFields tracks which field is unique among instances
   of each Schema. Also stores a default key for most Schemas
*/
const uniqueSchemaFields = {
// {'Schema Type': 'unique identifier key'}
  default: 'id',
};

// returns a boolean and covers most edge cases if a given value is and Object
const isObject = val => val instanceof Object && val.constructor === Object;

/*
  normalizeObj object uses the uniqueSchemaFields object
  to determine which property to use as the unique identifier
*/
const generateKeyFromTypeAndId = (obj) => {
  const type = obj.__typename;
  const field = uniqueSchemaFields[type] || uniqueSchemaFields.default;
  const id = obj[field];
  return `${type}:${id}`;
};

const normalize = ({ data }) => {
  const flat = {};

  // chose to use object to act as queue
  // for O(1) removal of items -> array.shift() is O(n) -> NO BUENO
  const queue = {};
  let queueLength = 0;
  let enqueueIndex = 0;
  let dequeueIndex = 0;

  const cacheAndQueue = (key, obj) => {
    // store obj in cache under key
    flat[key] = obj;
    // console.log(`adding "${key}" to queue`);

    // add key to queue
    queue[enqueueIndex] = key;
    // console.log(`queue: ${queue}`);
    // increment appropriate index
    enqueueIndex += 1;
    queueLength += 1;
  };

  const dequeue = () => {
    const key = queue[dequeueIndex];
    delete queue[dequeueIndex];
    dequeueIndex += 1;
    queueLength -= 1;
    return key;
  };

  const normalizeObject = (obj) => {
    const normal = {};
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      // check if value at key is array
      if (Array.isArray(value)) {
        const normalArray = [];
        // iterate, check for objects, cache and queue
        value.forEach((element, i) => {
          normalArray[i] = element;
          if (isObject(element)) {
            const uniqueKey = generateKeyFromTypeAndId(element);
            cacheAndQueue(uniqueKey, element);
            normalArray[i] = uniqueKey;
          }
        });

        normal[key] = normalArray;
        // check if value at key is object
      } else if (isObject(value)) {
        const uniqueKey = generateKeyFromTypeAndId(value);
        cacheAndQueue(uniqueKey, value);

        normal[key] = uniqueKey;
        // value is neither array or object
      } else {
        normal[key] = value;
      }
    });

    return normal;
  };

  // create keys and normalize object in topmost level
  // have to access the data object to get object
  Object.values(data).forEach((value) => {
    // handle arrays
    if (Array.isArray(value)) {
      // console.log('Value is array!');
      value.forEach((element) => {
        if (isObject(element)) {
          const key = generateKeyFromTypeAndId(element);
          cacheAndQueue(key, element);
        }
      });
    }

    // handle objects
    if (isObject(value)) {
      // console.log('value is Object!');
      const key = generateKeyFromTypeAndId(value);
      cacheAndQueue(key, value);
    }
  });
  // console.log(`Queued up ${Object.values(queue).length} items from data object`);

  // EMPTY THE QUEUE! (but fill it up along the way...)
  // make a function to extract objects and replace with keys
  // and add those keys to the queue to be normalized next
  // repeat until the queue is empty
  while (queueLength > 0) {
    // console.log(`${Object.keys(queue).length} items in queue`);
    // shift key from queue
    const queuedKey = dequeue();
    const nextObject = flat[queuedKey];
    // console.log(`next to normalize: ${queuedKey}`);

    // grab object from flat cache
    // call normalizeObject helper
    if (isObject(nextObject)) {
      const normal = normalizeObject(nextObject);
      flat[queuedKey] = normal;
    }
  }

  return flat;
};

const normal = normalize(result);

console.log('\n');
console.log(Object.keys(normal));
console.log('\n');
console.log(normal);
console.log('\n');

module.exports = normalize;
