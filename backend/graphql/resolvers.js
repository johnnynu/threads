const {
  findUserById,
  findUserByUsername,
  createUser,
  updateUserById
} = require("../utility/users");
const { createHaunt, deleteHauntById } = require("../utility/haunts");
const { User, Haunt, Like } = require("../models");
const { PubSub } = require("graphql-subscriptions");
const { v4: uuidv4 } = require("uuid");
const pubsub = new PubSub();

const HAUNT_CREATED = "HAUNT_CREATED";
const HAUNT_DELETED = "HAUNT_DELETED";
const LIKE_CREATED = "LIKE_CREATED";
const LIKE_DELETED = "LIKE_DELETED";

const resolvers = {
  Subscription: {
    hauntCreated: {
      subscribe: () => pubsub.asyncIterator(["HAUNT_CREATED"]),
      resolve: (payload) => payload.hauntCreated
    },
    hauntDeleted: {
      subscribe: () => pubsub.asyncIterator(["HAUNT_DELETED"]),
      resolve: (payload) => payload.hauntDeleted
    },
    likeCreated: {
      subscribe: () => pubsub.asyncIterator(["LIKE_CREATED"]),
      resolve: (payload) => payload.likeCreated
    },
    likeDeleted: {
      subscribe: () => pubsub.asyncIterator(["LIKE_DELETED"]),
      resolve: (payload) => payload.likeDeleted
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
    },
    editHaunt: async (_, { id, content }, context) => {
      const haunt = await Haunt.findByPk(id);
      console.log("Context in resolver", context);
      if (!haunt) {
        throw new Error("No haunt found with this ID");
      }
      if (content.length > 280) {
        throw new Error("Content too long");
      }
      if (haunt.userId.toString() !== context.userId) {
        throw new Error("User not authorized");
      }
      haunt.content = content;
      await haunt.save();
      return haunt;
    },
    deleteHaunt: async (_, { id }, context) => {
      const haunt = await Haunt.findByPk(id);
      console.log("haunt id", id);
      if (!haunt) {
        throw new Error("No haunt found with this ID");
      }
      if (haunt.userId.toString() !== context.userId) {
        throw new Error("User not authorized");
      }
      pubsub.publish(HAUNT_DELETED, { hauntDeleted: id });
      return deleteHauntById(id);
    },
    createLike: async (_, { hauntId }, context) => {
      const haunt = await Haunt.findByPk(hauntId);
      if (!haunt) {
        throw new Error("No haunt found with this ID");
      }
      const like = await Like.create({
        userId: context.userId,
        hauntId: hauntId
      });
      const likeCount = await Like.count({ where: { hauntId } });
      pubsub.publish(LIKE_CREATED, {
        likeCreated: { hauntId, likeId: like.id, likeCount }
      });

      return like;
    },
    deleteLike: async (_, { id }, context) => {
      const like = await Like.findOne({
        where: { id: id, userId: context.userId }
      });

      if (!like) {
        throw new Error("Like not found or you're not the owner");
      }
      await like.destroy();
      const likeCount = await Like.count({ where: { hauntId: like.hauntId } });
      pubsub.publish(LIKE_DELETED, {
        likeDeleted: { hauntId: like.hauntId, likeId: like.id, likeCount }
      });
      return true;
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
    user: (haunt) => User.findByPk(haunt.userId),
    likes: async (haunt) => {
      return await Like.findAll({ where: { hauntId: haunt.id } });
    }
  }
};

module.exports = resolvers;
