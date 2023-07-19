const typeDefs = `
type User {
    id: String!
    username: String!
    displayName: String!
    email: String!
    avatar: String
    bio: String
    haunts: [Haunt]
  }

  type Haunt {
    id: Int!
    content: String!
    user: User!
  }

  type Query {
    users: [User]
    haunts: [Haunt]
    user(id: String!): User
    checkUsername(username: String!): Boolean!
    getUserByEmail(email: String!): User
    haunt(id: Int!): Haunt
  }

  type Mutation {
    updateUserProfile(id: ID!, username: String!, displayName: String!, email: String!, bio: String, avatar: String): User!
  }
`;

module.exports = typeDefs;
