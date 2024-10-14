const { ServiceRequest } = require('../models'); // Adjust the path as necessary

// Get all service requests
exports.getAllServiceRequests = async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.findAll();
    res.status(200).json(serviceRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new service request
exports.createServiceRequest = async (req, res) => {
  const { deviceModel, description, status, userId, technicianId } = req.body;

  try {
    const newRequest = await ServiceRequest.create({ deviceModel, description, status, userId, technicianId });
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a service request by ID
exports.getServiceRequestById = async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findByPk(req.params.id);
    if (!serviceRequest) {
      return res.status(404).json({ message: 'Service request not found' });
    }
    res.status(200).json(serviceRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a service request
exports.updateServiceRequest = async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findByPk(req.params.id);
    if (!serviceRequest) {
      return res.status(404).json({ message: 'Service request not found' });
    }
    
    const updatedRequest = await serviceRequest.update(req.body);
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a service request
exports.deleteServiceRequest = async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findByPk(req.params.id);
    if (!serviceRequest) {
      return res.status(404).json({ message: 'Service request not found' });
    }
    
    await serviceRequest.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
