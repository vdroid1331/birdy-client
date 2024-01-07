import { graphql } from "@/gql";

export const getAllTweetsQuery = graphql(`
  #graphql

  query getAllTweets {
    getAllTweets {
      id
      content
      imageURL
      author {
        id
        firstName
        lastName
        profileImageURL
      }
    }
  }
`);
