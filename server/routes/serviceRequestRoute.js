// routes/serviceRequestRoutes.js

const express = require('express');
const router = express.Router();
const serviceRequestController = require('../controller/serviceRequestController');

// Routes for service requests
router.post('/', serviceRequestController.createRequest); // Create a new request
router.get('/', serviceRequestController.getAllRequests); // Get all requests
router.get('/:id', serviceRequestController.getRequestById); // Get request by ID
router.put('/:id/status', serviceRequestController.updateRequestStatus); // Update request status

module.exports = router;
