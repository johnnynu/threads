// Follow.js

const { DataTypes } = require("sequelize-cockroachdb");

function defineFollow(sequelize) {
  const Follow = sequelize.define("Follow", {
    followerId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    followeeId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Follow.associate = (models) => {
    Follow.belongsTo(models.User, { as: "follower", foreignKey: "followerId" });
    Follow.belongsTo(models.User, { as: "followee", foreignKey: "followeeId" });
  };

  return Follow;
}

module.exports = defineFollow;
