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
    likes: [Like]!
    reposts: [Repost]!
    replies: [Haunt]!
  }

  type Like {
    id: String!
    userId: String!
    hauntId: String!
    user: User!
    haunt: Haunt!
  }

  type Repost {
    id: String!
    userId: String!
    hauntId: String!
    user: User!
    haunt: Haunt!
  }

  type LikeUpdate {
    hauntId: String!
    likeId: String!
    likeCount: Int!
  }

  type RepostUpdate {
    hauntId: String!
    repostId: String!
    repostCount: Int!
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
    createHaunt(userId: String!, content: String!, parentHauntId: String): Haunt!
    editHaunt(id: String!, content: String!): Haunt
    deleteHaunt(id: String!): Boolean!
    createLike(hauntId: String!): Like!
    deleteLike(id: String!): Boolean!
    createRepost(hauntId: String!): Repost!
    deleteRepost(id: String!): Boolean!
  }

  type Subscription {
    hauntCreated: Haunt!
    hauntDeleted: ID!
    likeCreated: LikeUpdate!
    likeDeleted: LikeUpdate!
    repostCreated: RepostUpdate!
    repostDeleted: RepostUpdate!
  }
`;

module.exports = typeDefs;
