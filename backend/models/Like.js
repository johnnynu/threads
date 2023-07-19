// models/Like.js

const { DataTypes } = require("sequelize-cockroachdb");

function defineLike(sequelize) {
  const Like = sequelize.define("Like", {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Users", // 'users' refers to table name not model name
        key: "id"
      },
      onDelete: "CASCADE"
    },
    tweetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Haunts", // 'haunts' refers to table name not model name
        key: "id"
      },
      onDelete: "CASCADE"
    }
  });

  // Define associations inside associate method
  Like.associate = (models) => {
    Like.belongsTo(models.User, { as: "user", foreignKey: "userId" });
    Like.belongsTo(models.Haunt, { as: "haunt", foreignKey: "tweetId" }); // tweetId is the foreign key to Haunt
  };

  return Like;
}

module.exports = defineLike;
