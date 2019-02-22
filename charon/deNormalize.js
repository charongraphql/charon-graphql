const cache = {
  'Author:1': { __typename: 'Author', id: '1', name: 'ben' }, 
  'Author:2': { __typename: 'Author', id: '2', name: 'chang' }, 
  'Author:3': { __typename: 'Author', id: '3', name: 'joel' }, 
}

const dummyNormalizedData = { 
  // 'Listing:66':  
  // { __typename: 'Listing', 
  //   id: '66', 
  //   title: 'refrigerator', 
  //   author: 'Author:1' }, 
  // 'Listing:67':  
  // { __typename: 'Listing', 
  //   id: '67', 
  //   title: 'Large Trampoline', 
  //   author: 'Author:2' }, 
  // 'Listing:68':  
  // { __typename: 'Listing', 
  //   id: '68', 
  //   title: 'big bowl of jello', 
  //   author: 'Author:2' }, 
  // 'Listing:53':  
  // { __typename: 'Listing',
  //   id: '53', 
  //   title: 'Television', 
  //   author: 'Author:3' }
}

const sampleData = {
  "authors": [
    {
      "__typename": "Author",
      "id": "1",
      "name": "ben",
      "listing": [
        {
          "__typename": "Listing",
          "id": "66",
          "title": "refrigerator",
          "author": {
            "__typename": "Author",
            "id": "1",
            "name": "ben"
          }
        }
      ]
    } 
  ]
};

// const normalized = () => {

// }

const deNormalize = (cache) => {
  const output = {}; // trial with array
  Object.entries(cache).forEach((entry) => {
    
  });
  return output;
};

console.log(deNormalize(dummyNormalizedData));
    
    // iterate through props of object
      // if the last char of a value equals a number
        // iterate backward while the curr char equals a number,
          // if the next char equals a colon
            // break
export default deNormalize;



console.log(dummyNormalizedData["Author:1"])