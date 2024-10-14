// controllers/serviceRequestController.js

const ServiceRequest = require('../models/serviceRequest'); // Adjust the path as necessary
const User = require('../models/user'); // Assuming you have a User model

// Function to find the next available technician based on user roles
const findNextAvailableTechnician = async () => {
  const technician = await User.findOne({
    where: { role: 'technician' }, // Filter for technicians
    // Add any additional logic to determine availability, if needed
    order: [['id', 'ASC']], // You can adjust this to find the next available technician
  });
  return technician ? technician.id : null; // Return the technician's ID or null if not found
};

exports.createRequest = async (req, res) => {
  try {
    const { userId, description, deviceModel, problemComplexity } = req.body;

    let assignedTechnicianId = null;
    if (problemComplexity === 'Simple') {
    //   assignedTechnicianId = await findNextAvailableTechnician(); // Auto-assign if simple
      assignedTechnicianId = 1; // Auto-assign if simple

    }

    const newRequest = await ServiceRequest.create({
      userId,
      description,
      deviceModel,
      problemComplexity,
      status: 'Pending',
      assignedTechnicianId,
    });

    res.status(201).json({ success: true, data: newRequest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.findAll({
      include: [{ model: User }], // Include associated user data
    });
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await ServiceRequest.findByPk(id, {
      include: [{ model: User }], // Include associated user data
    });

    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    res.status(200).json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedTechnicianId } = req.body;

    const request = await ServiceRequest.findByPk(id);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    request.status = status; // Update the status
    request.assignedTechnicianId = assignedTechnicianId || request.assignedTechnicianId; // Update if provided
    await request.save();

    res.status(200).json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
