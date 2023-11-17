const express = require('express');
const router = express.Router();
const meetingsController = require('../controllers/meetings');

// Create meeting details
router.post('/meetings', meetingsController.createMeetingDetails);

// Get all meeting details
router.get('/meetings', meetingsController.getAllMeetingDetails);

// Get meeting details by ID
router.get('/meetings/:id', meetingsController.getMeetingDetailsById);

// Update meeting details by ID
router.put('/meetings/:id', meetingsController.updateMeetingDetails);

// Delete meeting details by ID
router.delete('/meetings/:id', meetingsController.deleteMeetingDetails);

module.exports = router;
