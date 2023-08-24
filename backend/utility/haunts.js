const { Haunt } = require("../models");

async function createHaunt({ id, userId, content, parentHauntId }) {
  const haunt = await Haunt.create({ id, userId, content, parentHauntId });
  return haunt;
}

async function deleteHauntById(id) {
  const haunt = await Haunt.findByPk(id);
  console.log("haunt id in utility", id);
  if (!haunt) {
    throw new Error("No haunt found with this ID");
  }
  await haunt.destroy();
  return true;
}

module.exports = {
  createHaunt,
  deleteHauntById
};
