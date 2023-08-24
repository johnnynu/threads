// models/Haunt.js

const { DataTypes } = require("sequelize-cockroachdb");

function defineHaunt(sequelize) {
  const Haunt = sequelize.define(
    "Haunt",
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      parentHauntId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "Haunts",
          key: "id"
        },
        onDelete: "cascade"
      },
      content: {
        type: DataTypes.STRING(280),
        allowNull: false
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "cascade"
      }
    },
    {
      timestamps: true
    }
  );

  // This creates a foreign key relationship with the User model.
  // If you query a Haunt from the DB, it will include the associated User under the key 'user'.
  Haunt.associate = (models) => {
    Haunt.belongsTo(models.User, { as: "user", foreignKey: "userId" });
    Haunt.belongsTo(models.Haunt, {
      as: "parentHaunt",
      foreignKey: "parentHauntId"
    });
    Haunt.hasMany(models.Like, { as: "likes", foreignKey: "hauntId" });
    Haunt.hasMany(models.Repost, { as: "reposts", foreignKey: "hauntId" });
    Haunt.hasMany(models.Haunt, { as: "replies", foreignKey: "parentHauntId" });
  };

  return Haunt;
}

module.exports = defineHaunt;
