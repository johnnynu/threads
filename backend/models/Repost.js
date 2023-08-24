const { DataTypes } = require("sequelize-cockroachdb");

function defineRepost(sequelize) {
  const Repost = sequelize.define("Repost", {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      },
      onDelete: "CASCADE"
    },
    hauntId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Haunts",
        key: "id"
      },
      onDelete: "CASCADE"
    }
  });

  Repost.associate = (models) => {
    Repost.belongsTo(models.User, { foreignKey: "userId" });
    Repost.belongsTo(models.Haunt, { foreignKey: "hauntId" });
  };

  return Repost;
}

module.exports = defineRepost;
