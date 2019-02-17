import { gql } from 'apollo-boost';

// Queries
// const queries = {
//   getListingsQuery: gql`
//   {
//     listings {
//       id
//       title
//       author {
//         id
//         name
//       }
//     }
//   }
// `,
// };


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
  # defining arguments and types for mutation
  mutation($title:String!, $authorId:ID!) {
    # consuming the arguments in the actual mutation
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

// export default queries;
export {
  getListingsQuery, getAuthorsQuery, addListingMutation, deleteListingMutation,
};
