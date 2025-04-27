const SavedLocationHelper = require("../helpers/savedLocationHelper");
const Validation = require("../helpers/validationHelper");
const GeneralHelper = require("../helpers/generalHelper");

const createSavedLocation = async (request, reply) => {
  try {
    Validation.createSavedLocationValidation(request.body);

    const { label, address, latitude, longitude } = request.body;
    const { verifiedUser } = request.user;

    const response = await SavedLocationHelper.createLocation({
      userId: verifiedUser.id,
      label,
      address,
      latitude,
      longitude,
    });

    return reply.send(response);
  } catch (err) {
    console.error(err);
    return reply
      .status(GeneralHelper.statusResponse(err))
      .send(GeneralHelper.errorResponse(err));
  }
};

const getSavedLocations = async (request, reply) => {
  try {
    const { verifiedUser } = request.user;

    const response = await SavedLocationHelper.getLocations(verifiedUser.id);

    return reply.send(response);
  } catch (err) {
    console.error(err);
    return reply
      .status(GeneralHelper.statusResponse(err))
      .send(GeneralHelper.errorResponse(err));
  }
};

module.exports = {
  createSavedLocation,
  getSavedLocations,
};
