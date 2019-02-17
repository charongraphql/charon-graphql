import { gql } from 'apollo-boost';

// Queries
const getListingsQuery = gql`
  {
    listings {
      id
      title
      author {
        id
        name
      }
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      id
      name
    }
  }
`;

// Mutations
const addListingMutation = gql`
  mutation($title: String!, $authorId: ID!) {
    addListing(title: $title, author_id: $authorId) {
      title
      author {
        name
      }
    }
  }
`;

const deleteListingMutation = gql`
  mutation($id: ID!) {
    deleteListing(id: $id) {
      title
      author {
        name
      }
    }
  }
`;

export { getListingsQuery, getAuthorsQuery, addListingMutation, deleteListingMutation };
