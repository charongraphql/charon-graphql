
const preNormalizedDummyData = {
  "data": {
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
      },
      {
        "__typename": "Author",
        "id": "2",
        "name": "chang",
        "listing": [
          {
            "__typename": "Listing",
            "id": "67",
            "title": "Large Trampoline",
            "author": {
              "__typename": "Author",
              "id": "2",
              "name": "chang"
            }
          },
          {
            "__typename": "Listing",
            "id": "68",
            "title": "big bowl of jello",
            "author": {
              "__typename": "Author",
              "id": "2",
              "name": "chang"
            }
          }
        ]
      },
      {
        "__typename": "Author",
        "id": "3",
        "name": "joel",
        "listing": [
          {
            "__typename": "Listing",
            "id": "53",
            "title": "Television",
            "author": {
              "__typename": "Author",
              "id": "3",
              "name": "joel"
            }
          }
        ]
      }
    ]
  }
}


const cachedData = {
  'Author:1':  
   { __typename: 'Author', 
     id: '1', 
     name: 'ben', 
     listing: [ 'Listing:66' ] },
  'Author:2':  
   { __typename: 'Author', 
     id: '2', 
     name: 'chang', 
     listing: [ 'Listing:67', 'Listing:68' ] }, 
  'Author:3':  
   { __typename: 'Author', 
     id: '3', 
     name: 'joel', 
     listing: [ 'Listing:53' ] }, 
  'Listing:66':  
   { __typename: 'Listing', 
     id: '66', 
     title: 'refrigerator', 
     author: 'Author:1' }, 
  'Listing:67':  
   { __typename: 'Listing', 
     id: '67', 
     title: 'Large Trampoline', 
     author: 'Author:2' }, 
  'Listing:68':  
   { __typename: 'Listing', 
     id: '68', 
     title: 'big bowl of jello', 
     author: 'Author:2' }, 
  'Listing:53':  
   { __typename: 'Listing', 
     id: '53', 
     title: 'Television', 
     author: 'Author:3' } 
    };

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

const smallSampleCache = {
  'Author:2':  
    { __typename: 'Author', 
      id: '2', 
      name: 'chang', 
      listing: [ 'Listing:67', 'Listing:68' ] 
    },
  'Listing:67':  
    { __typename: 'Listing', 
      id: '67', 
      title: 'Large Trampoline', 
      author: 'Author:2' }, 
  'Listing:68':  
    { __typename: 'Listing', 
      id: '68', 
      title: 'big bowl of jello', 
      author: 'Author:2' },

}

// str.match(/[(?=())(?=[\])(?={})]/g);


const reconstructQuery = (flatQuery, data) => {
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
      graphqlFormatedQuery[field] = data[value].id
    } else {
      graphqlFormatedQuery[field] = value
    }
  });

  return graphqlFormatedQuery;
}

const deNormalize = (flatData) => {
  const nestedData = {};

  Object.entries(flatData).forEach(([cacheKey, queryBody]) => {
    
    const field = cacheKey.toLowerCase().replace(/(:)(?<=:)\S+/g, 's');
    
    nestedData[field] = reconstructQuery(queryBody, flatData);
  });

  return JSON.stringify(nestedData, null, 2);
}

const sampleValue = { 
  __typename: 'Listing', 
  id: '67', 
  title: 'Large Trampoline',
  author: 'Author:2' 
};



console.log(reconstructQuery(sampleValue, smallSampleCache))

console.log(deNormalize(smallSampleCache))

//console.log(deNorm(smallSampleCache));
    // iterate through props of object
      // if the last char of a value equals a number
        // iterate backward while the curr char equals a number,
          // if the next char equals a colon
            // break
export default deNormalize;



// console.log(dummyNormalizedData["Author:1"].listing)