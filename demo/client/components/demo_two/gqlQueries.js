const gql = {
  getListings: () => {
    return fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `{ 
          listings { 
            id 
            title 
            author { 
              id name 
            } 
          } 
        }`,
      }),
    })
      .then(r => r.json())
      .then(data => data);
  },

  getAuthors: () => {
    return fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `{ 
        authors { 
          id name 
        } 
      }`,
      }),
    })
      .then(r => r.json())
      .then(data => data);
  },

  addListing: (title, authorId) => {
    return fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `mutation($title: String!, $authorId: ID!) { 
          addListing(title: $title, author_id: $authorId) {
            id
            title
            author {
              id
              name
            }
          }
        }`,
        variables: { title, authorId },
      }),
    })
      .then(r => r.json())
      .then(data => data);
  },

  deleteListing: id => {
    return fetch('/graphql', {
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
