const express = require('express');
const router = express.Router();
const meetingsController = require('../controllers/meetings');

// Get all meeting details
router.get('/meetings', meetingsController.getAllMeetingDetails);

// Get meeting details by ID
router.get('/:id', meetingsController.getMeetingDetailsById);

// Create meeting details
router.post('/meetings', meetingsController.createMeetingDetails);

// Update meeting details by ID
router.put('/meetings/:id', meetingsController.updateMeetingDetails);

// Delete meeting details by ID
router.delete('/meetings/:id', meetingsController.deleteMeetingDetails);

module.exports = router;

