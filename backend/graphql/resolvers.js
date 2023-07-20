const {
  findUserById,
  findUserByUsername,
  createUser,
  updateUserById
} = require("../utility/users");
const { createHaunt } = require("../utility/haunts");
const { User, Haunt } = require("../models");
const { PubSub } = require("graphql-subscriptions");
const { v4: uuidv4 } = require("uuid");
const pubsub = new PubSub();

const HAUNT_CREATED = "HAUNT_CREATED";

const resolvers = {
  Subscription: {
    hauntCreated: {
      subscribe: () => pubsub.asyncIterator(["HAUNT_CREATED"]),
      resolve: (payload) => payload.hauntCreated
    }
  },
  Mutation: {
    updateUserProfile: async (
      _,
      { id, username, displayName, email, bio, avatar }
    ) => {
      const existingUser = await findUserByUsername(username);
      if (existingUser && existingUser.id !== id) {
        throw new Error(
          "Username already exists. Please choose a different username."
        );
      }
      let user = await findUserById(id);
      console.log("User found by ID:", user);
      // If the user does not exist, this is a sign-up operation
      if (!user) {
        user = await createUser({
          id,
          username,
          displayName,
          email,
          bio,
          avatar
        });
        console.log("New user created:", user);
      } else {
        // If the user does exist, this is an update operation
        user = await updateUserById(id, {
          username,
          displayName,
          email,
          bio,
          avatar
        });
        console.log("User updated:", user);
      }
      return user;
    },
    createHaunt: async (_, { userId, content }) => {
      const user = await findUserById(userId);
      if (!user) {
        throw new Error("No user found with this ID");
      }
      if ((user.isVerified || user.isGhostVerified) && content.length > 25000) {
        throw new Error("Content too long");
      }
      if (!user.isVerified && !user.isGhostVerified && content.length > 280) {
        throw new Error("Content too long");
      }
      const id = uuidv4();
      const haunt = await createHaunt({
        id,
        userId,
        content
      });

      haunt.user = user;

      pubsub.publish(HAUNT_CREATED, { hauntCreated: haunt });

      return haunt;
    }
  },
  Query: {
    users: () => User.findAll(),
    getAllHaunts: () => Haunt.findAll({ order: [["createdAt", "DESC"]] }),
    user: (_, { id }) => User.findByPk(id),
    checkUsername: async (_, { username }) => {
      const user = findUserByUsername(username);
      return user ? false : true;
    },
    getUserByEmail: (_, { email }) => {
      const response = User.findOne({ where: { email } });
      if (response) {
        return response;
      } else {
        return null;
      }
    },
    haunt: (_, { id }) => Haunt.findByPk(id)
  },
  User: {
    haunts: (user) => Haunt.findAll({ where: { userId: user.id } })
  },

  Haunt: {
    user: (haunt) => User.findByPk(haunt.userId)
  }
};

module.exports = resolvers;
