// models/Haunt.js

const { DataTypes } = require("sequelize-cockroachdb");

function defineHaunt(sequelize) {
  const Haunt = sequelize.define(
    "Haunt",
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      content: {
        type: DataTypes.STRING(1000),
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
  };

  return Haunt;
}

module.exports = defineHaunt;
