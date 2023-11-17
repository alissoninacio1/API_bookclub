const { getDb } = require('..//database/db.connection');
const { ObjectId } = require('mongodb');
const MeetingDetails = require('../models/meetings.model');

// Function to create meeting details
const createMeetingDetails = async (req, res) => {
  try {
    const { bookClub, host, time, date, dayOfWeek, location, typeOfMeeting, book } = req.body;

    if (!bookClub || !host || !time || !date || !dayOfWeek || !location || !typeOfMeeting) {
      return res.status(400).json({ error: 'All fields are mandatory.' });
    }

    const db = getDb();
    const meetingDetailsCollection = db.collection('meetingDetails');

    const newMeetingDetails = new MeetingDetails({
      bookClub,
      host,
      time,
      date,
      dayOfWeek,
      location,
      typeOfMeeting,
      book,
    });

    const savedMeetingDetails = await newMeetingDetails.save();

    res.status(201).json(savedMeetingDetails);
  } catch (error) {
    console.error('Error creating meeting details:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to get all meeting details
const getAllMeetingDetails = async (req, res) => {
  try {
    const meetingDetails = await MeetingDetails.find();

    res.json(meetingDetails);
  } catch (error) {
    console.error('Error getting meeting details:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to get meeting details by ID
const getMeetingDetailsById = async (req, res) => {
  try {
    const meetingDetails = await MeetingDetails.findById(req.params.id);

    if (!meetingDetails) {
      return res.status(404).json({ error: 'Meeting details not found.' });
    }

    res.json(meetingDetails);
  } catch (error) {
    console.error('Error getting meeting details by ID:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to update meeting details by ID
const updateMeetingDetails = async (req, res) => {
  try {
    const { bookClub, host, time, date, dayOfWeek, location, typeOfMeeting, book } = req.body;

    if (!bookClub || !host || !time || !date || !dayOfWeek || !location || !typeOfMeeting) {
      return res.status(400).json({ error: 'All fields are mandatory.' });
    }

    const db = getDb();
    const meetingDetailsCollection = db.collection('meetingDetails');

    const updatedMeetingDetails = await MeetingDetails.findByIdAndUpdate(
      req.params.id,
      {
        bookClub,
        host,
        time,
        date,
        dayOfWeek,
        location,
        typeOfMeeting,
        book,
      },
      { new: true }
    );

    res.json(updatedMeetingDetails);
  } catch (error) {
    console.error('Error updating meeting details:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to delete meeting details by ID
const deleteMeetingDetails = async (req, res) => {
  try {
    await MeetingDetails.findByIdAndDelete(req.params.id);

    res.json({ message: 'Meeting details deleted successfully.' });
  } catch (error) {
    console.error('Error deleting meeting details:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  createMeetingDetails,
  getAllMeetingDetails,
  getMeetingDetailsById,
  updateMeetingDetails,
  deleteMeetingDetails,
};
