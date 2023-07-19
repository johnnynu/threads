// models/User.js

const { DataTypes } = require("sequelize-cockroachdb");

function defineUser(sequelize) {
  const User = sequelize.define("User", {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  User.associate = function (models) {
    User.hasMany(models.Haunt, { foreignKey: "userId" });
  };

  return User;
}

module.exports = defineUser;
