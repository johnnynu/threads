"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize-cockroachdb");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let seqInstance;
if (process.env.DATABASE_URL) {
  seqInstance = new Sequelize(process.env.DATABASE_URL, config);
} else {
  seqInstance = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

seqInstance
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const defineModel = require(path.join(__dirname, file));
    const model = defineModel(seqInstance);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.User.sync({ alter: true })
  .then(() => {
    return db.Haunt.sync({ alter: true });
  })
  .then(() => {
    return db.Follow.sync({ alter: true });
  })
  .then(() => {
    return db.Like.sync({ alter: true });
  })
  .then(() => {
    return db.Haunt.sync({ alter: true });
  })
  .catch((error) => {
    console.error("An error occurred while creating the tables:", error);
  });

// use when you want to drop all tables and start fresh
// seqInstance.sync({ force: true });

db.seqInstance = seqInstance;
db.Sequelize = Sequelize;

module.exports = db;
