const db = require('../models');  // Sesuaikan dengan path model kamu
const authMiddleware = require('../middleware/authMiddleware');  // Sesuaikan dengan path middleware

// Create PickupRequest
const createPickupRequest = async (request, reply) => {
  try {
    const { imageUrl, classificationType, address, latitude, longitude, weight, schedule } = request.body;
    const { verifiedUser } = request.user;

    const pickupRequest = await db.PickupRequest.create({
      imageUrl,
      classificationType,
      address,
      latitude,
      longitude,
      weight,
      schedule,
      status: 'Pending',  // Status default
      user_id: verifiedUser.id,
    });

    return reply.status(201).json({
      message: "Pickup request created successfully",
      data: pickupRequest,
    });
  } catch (err) {
    console.error(err);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
};

// Update PickupRequest status
const updatePickupRequest = async (request, reply) => {
  try {
    const { pickupRequestId } = request.params;
    const { status } = request.body; // Status baru
    const { verifiedUser } = request.user;

    // Cari PickupRequest berdasarkan ID (tanpa filter user_id)
    const pickupRequest = await db.PickupRequest.findOne({ where: { id: pickupRequestId } });

    if (!pickupRequest) {
      return reply.status(404).json({ message: "Pickup request not found." });
    }

    // Update status pickup request
    pickupRequest.status = status; // Update status dengan nilai yang diterima
    await pickupRequest.save();

    return reply.status(200).json({
      message: "Pickup request status updated successfully",
      data: pickupRequest,
    });
  } catch (err) {
    console.error(err);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
};


// Cancel PickupRequest
const cancelPickupRequest = async (request, reply) => {
  try {
    const { pickupRequestId } = request.params; // Ambil ID request
    const { verifiedUser } = request.user; // Ambil data pengguna yang terverifikasi

    // Cari PickupRequest berdasarkan ID (tanpa filter user_id)
    const pickupRequest = await db.PickupRequest.findOne({ where: { id: pickupRequestId } });

    if (!pickupRequest) {
      return reply.status(404).json({ message: "Pickup request not found." });
    }

    // Set status ke 'Cancelled'
    pickupRequest.status = 'Cancelled';
    await pickupRequest.save();

    return reply.status(200).json({
      message: "Pickup request cancelled successfully",
      data: pickupRequest,
    });
  } catch (err) {
    console.error(err);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
};

// Get all PickupRequests
const getPickupRequests = async (request, reply) => {
  try {
    const { verifiedUser } = request.user;

    // Mengambil semua PickupRequests milik user yang sedang login
    const pickupRequests = await db.PickupRequest.findAll({
      where: { user_id: verifiedUser.id },
    });

    if (!pickupRequests || pickupRequests.length === 0) {
      return reply.status(404).json({ message: "No pickup requests found." });
    }

    return reply.status(200).json({
      message: "Successfully fetched pickup requests",
      data: pickupRequests,
    });
  } catch (err) {
    console.error(err);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
};

// Get all PickupRequests without user filtering
const getAllPickupRequests = async (request, reply) => {
  try {
    // Ambil semua pickup requests tanpa filter user_id
    const pickupRequests = await db.PickupRequest.findAll();

    if (!pickupRequests || pickupRequests.length === 0) {
      return reply.status(404).json({ message: "No pickup requests found." });
    }

    return reply.status(200).json({
      message: "Successfully fetched all pickup requests",
      data: pickupRequests,
    });
  } catch (err) {
    console.error(err);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
};


module.exports = {
  createPickupRequest,
  updatePickupRequest,
  cancelPickupRequest,
  getPickupRequests,
  getAllPickupRequests,
};
