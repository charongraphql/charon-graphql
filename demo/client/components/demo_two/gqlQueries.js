import charon from './cache';

const gql = {
  getListings: () => {
    return fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `{ 
          listings {
            __typename 
            id 
            title 
            author { 
              __typename
              id 
              name 
            } 
          } 
        }`,
      }),
    })
      .then(r => r.json())
      .then(data => {
        console.log('the actual data::: ', JSON.stringify(data, null, 2));
        charon.addResult(data);
        console.log('the charon cache::: ', JSON.stringify(charon.cache, null, 2));

        return data;
      });
  },

  getAuthors: () => {
    return fetch('api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `{ 
        authors { 
          __typename
          id 
          name 
        } 
      }`,
      }),
    })
      .then(r => r.json())
      .then(data => data);
  },

  addListing: (title, id) => {
    return fetch('api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `mutation($title: String!, $id: ID!) { 
          addListing(title: $title, author_id: $id) {
            id
            title
            author {
              id
              name
            }
          }
        }`,
        variables: { id, title },
      }),
    })
      .then(r => r.json())
      .then(data => {
        return data;
      });
  },

  deleteListing: id => {
    return fetch('api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `mutation($id: ID!) { 
          deleteListing(id: $id) {
            title
            author {
              name
            }
          }
        }`,
        variables: { id },
      }),
    })
      .then(r => r.json())
      .then(data => data);
  },
};

export default gql;
