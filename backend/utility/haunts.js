const { Haunt } = require("../models");

async function createHaunt({ id, userId, content }) {
  const haunt = await Haunt.create({ id, userId, content });
  return haunt;
}

module.exports = {
  createHaunt
};
