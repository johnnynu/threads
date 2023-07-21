const typeDefs = `
type User {
  id: String!
  username: String!
  displayName: String!
  email: String!
  avatar: String
  bio: String
  haunts: [Haunt]
  isVerified: Boolean!
  isGhostVerified: Boolean!
  organization: String
}

  type Haunt {
    id: String!
    content: String!
    user: User!
    createdAt: String!
  }

  type Query {
    users: [User]
    getAllHaunts: [Haunt]
    user(id: String!): User
    checkUsername(username: String!): Boolean!
    getUserByEmail(email: String!): User
    haunt(id: String!): Haunt
  }

  type Mutation {
    updateUserProfile(id: ID!, username: String!, displayName: String!, email: String!, bio: String, avatar: String): User!
    createHaunt(userId: String!, content: String!): Haunt!
    editHaunt(id: String!, content: String!): Haunt
    deleteHaunt(id: String!): Boolean!
  }

  type Subscription {
    hauntCreated: Haunt!
  }
`;

module.exports = typeDefs;
