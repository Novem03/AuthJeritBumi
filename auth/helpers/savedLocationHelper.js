const { SavedLocation } = require("../models");

const createLocation = async ({ userId, label, address, latitude, longitude }) => {
  const newLocation = await SavedLocation.create({
    user_id: userId,
    label,
    address,
    latitude,
    longitude,
  });

  return { message: "Saved location created successfully.", data: newLocation };
};

const getLocations = async (userId) => {
  const locations = await SavedLocation.findAll({
    where: { user_id: userId },
    order: [["createdAt", "DESC"]],
  });

  return { message: "Successfully fetched saved locations.", data: locations };
};

module.exports = {
  createLocation,
  getLocations,
};
