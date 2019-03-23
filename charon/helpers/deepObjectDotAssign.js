const deepObjectDotAssign = (target, source) => {
  const err = [];
  Object.entries(target).forEach(entry => {
    const key = entry[0];
    if (!source[key]) {
      err.push(entry);
    } else if (target[key].constructor === Object) {
      const temp = deepObjectDotAssign(target[key], source[key]);
      if (!temp.err) {
        target[key] = temp.target;
      } else {
        err.push(...temp.err);
      }
    } else if (target[key].constructor === Array) {
      // how do i find out which object from the target correlates to the object in the array?
      // they can, and maybe will be out of order
      target[key].forEach((nestedObj, index) => {
        const temp = deepObjectDotAssign(target[key][index], source[key][index]);
        if (!temp.err) {
          target[key][index] = temp.target;
        } else {
          err.push(...temp.err);
        }
      });
    } else {
      target[key] = source[key];
    }
  });
  return { target, err };
};

module.exports = deepObjectDotAssign;
