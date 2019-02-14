import { gql } from 'apollo-boost';

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

// const getAuthorsQuery = gql`
//   {
//     authors {
//       id
//       name
//     }
//   }
// `;

export { getListingsQuery };
