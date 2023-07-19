const {
  findUserById,
  findUserByUsername,
  createUser,
  updateUserById
} = require("../utility/users");
const { User, Haunt } = require("../models");

const resolvers = {
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
    }
  },
  Query: {
    users: () => User.findAll(),
    haunts: () => Haunt.findAll(),
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
