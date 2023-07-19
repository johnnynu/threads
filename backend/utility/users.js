const { User } = require("../models");

// Function to find a user by their ID
async function findUserById(id) {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    console.error("Error finding user by ID:", error);
    return null;
  }
}

// Function find a user by their username
async function findUserByUsername(username) {
  try {
    const user = await User.findOne({ where: { username } });
    return user;
  } catch (error) {
    console.error("Error finding user by username:", error);
    return null;
  }
}

// Function to create a new user
async function createUser(userData) {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}

// Function to update a user by their ID
async function updateUserById(id, newUserData) {
  try {
    const updateResult = await User.update(newUserData, {
      where: {
        id: id
      }
    });
    if (updateResult[0] === 0) {
      // No user was updated, possibly because no user was found with the provided ID
      console.error("No user was found with the provided ID");
      return null;
    }
    // After a successful update, retrieve the updated user
    const updatedUser = await User.findByPk(id);
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
}

module.exports = {
  findUserById,
  findUserByUsername,
  createUser,
  updateUserById
};
