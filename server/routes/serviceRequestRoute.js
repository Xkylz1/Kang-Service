const express = require('express');
const router = express.Router();
const serviceRequestController = require('../controller/serviceRequestController');

// Define routes
router.get('/', serviceRequestController.getAllServiceRequests); // Get all service requests
router.post('/', serviceRequestController.createServiceRequest); // Create a new service request
router.get('/:id', serviceRequestController.getServiceRequestById); // Get a service request by ID
router.put('/:id', serviceRequestController.updateServiceRequest); // Update a service request
router.delete('/:id', serviceRequestController.deleteServiceRequest); // Delete a service request

module.exports = router;
