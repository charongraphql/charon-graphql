/* eslint-disable no-underscore-dangle, no-param-reassign */
const uniqueSchemaFields = require('./uniqueSchemaFields');

// returns a boolean and covers most edge cases if a given value is an Object
const isObject = val => val instanceof Object && val.constructor === Object;

/*
  normalizeObj object uses the uniqueSchemaFields object
  to determine which property to use as the unique identifier
*/
const generateKeyFromTypeAndId = (obj, query) => {
  const schemaType = obj.__typename ? obj.__typename : query;
  const field = uniqueSchemaFields.getField(schemaType);
  const id = obj[field] ? obj[field] : '';
  return `${schemaType}:${id}`;
};

function normalize(data, query) {
  const flat = {};

  // chose to use object to act as queue
  // for O(1) removal of items -> array.shift() is O(n) -> NO BUENO
  const queue = {};
  let queueLength = 0;
  let enqueueIndex = 0;
  let dequeueIndex = 0;

  const cacheAndQueue = (key, obj) => {
    // store obj in cache under key if it doesn't exist there yet
    if (flat[key] === undefined) flat[key] = obj;
    // add key to queue
    queue[enqueueIndex] = key;

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

  const normalizeObject = obj => {
    const normal = {};
    Object.entries(obj).forEach(([key, value]) => {
      // check if value at key is array
      if (Array.isArray(value)) {
        normal[key] = [];
        // iterate, check for objects, cache and queue
        value.forEach((element, i) => {
          let nextPush = element;
          if (isObject(element)) {
            const uniqueKey = generateKeyFromTypeAndId(element);
            cacheAndQueue(uniqueKey, element);
            nextPush = uniqueKey;
          }
          normal[key].push(nextPush);
        });

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
  Object.values(data).forEach(value => {
    let uniqueKey;
    // handle arrays
    if (Array.isArray(value)) {
      value.forEach(element => {
        if (isObject(element)) {
          uniqueKey = generateKeyFromTypeAndId(element);
          cacheAndQueue(uniqueKey, element);
        }
      });
    }

    // handle objects
    if (isObject(value)) {
      uniqueKey = generateKeyFromTypeAndId(value, query);
      cacheAndQueue(uniqueKey, value);
    }
  });

  // EMPTY THE QUEUE! (but fill it up along the way...)
  // make a function to extract objects and replace with keys
  // and add those keys to the queue to be normalized next
  // repeat until the queue is empty
  while (queueLength > 0) {
    // shift key from queue
    const queuedKey = dequeue();
    const nextObject = flat[queuedKey];

    // grab object from flat cache
    // call normalizeObject helper
    // if (isObject(nextObject)) {
    const normal = normalizeObject(nextObject);

    flat[queuedKey] = normal;
    // }
  }

  return flat;
}
module.exports = normalize;
