// meetings.js
const express = require('express');
const router = express.Router();
const meetingsController = require('../controllers/meetings');

// Create meeting details
router.post('/', meetingsController.createMeetingDetails);

// Get all meeting details
router.get('/', meetingsController.getAllMeetingDetails);

// Get meeting details by ID
router.get('/:id', meetingsController.getMeetingDetailsById);

// Update meeting details by ID
router.put('/:id', meetingsController.updateMeetingDetails);

// Delete meeting details by ID
router.delete('/:id', meetingsController.deleteMeetingDetails);

module.exports = router;
