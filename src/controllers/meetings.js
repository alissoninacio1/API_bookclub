const { ObjectId } = require('mongodb');
const { initDb } = require('../database/db.connection');

const initCollection = async () => {
  try {
    const db = await initDb();
    console.log('Collection initialized successfully.');
    return db; // Return the database instance
  } catch (error) {
    console.error('Error initializing collection:', error);
  }
};

const getAllMeetingDetails = async (req, res) => {
  try {
    const db = await initCollection();
    const meetingDetails = await db.collection('meetingDetails').find().toArray();
    res.json(meetingDetails);
  } catch (error) {
    console.error('Error getting meeting details:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to get meeting details by ID
async function getMeetingDetailsById(id) {
  await initCollection();

  try {
    if (!ObjectId.isValid(id)) {
      return null;
    }

    const objectId = new ObjectId(id);
    const meetingDetails = await meetingDetailsCollection.findOne({ _id: objectId });

    return meetingDetails;
  } catch (err) {
    console.error('Error fetching meeting details by ID:', err);
    throw err;
  }
}

// Function to create meeting details
async function createMeetingDetails(meetingData) {
  await initCollection();

  try {
    const db = initDb(); // Get the connection instance using initDb
    const result = await db.collection('meetingDetails').insertOne(meetingData);
    return result.insertedId;
  } catch (err) {
    console.error('Error creating meeting details:', err);
    throw err;
  }
}

// Function to update meeting details by ID
async function updateMeetingDetails(id, updatedMeetingData) {
  await initCollection();

  try {
    const db = initDb(); // Get the connection instance using initDb
    if (!ObjectId.isValid(id)) {
      return false;
    }

    const objectId = new ObjectId(id);
    const result = await db.collection('meetingDetails').updateOne(
      { _id: objectId },
      { $set: updatedMeetingData }
    );

    return result.modifiedCount > 0;
  } catch (err) {
    console.error('Error updating meeting details:', err);
    throw err;
  }
}

// Function to delete meeting details by ID
async function deleteMeetingDetails(id) {
  await initCollection();

  try {
    const db = initDb(); // Get the connection instance using initDb
    const objectId = new ObjectId(id);
    const result = await db.collection('meetingDetails').deleteOne({ _id: objectId });

    return result.deletedCount > 0;
  } catch (err) {
    console.error('Error deleting meeting details:', err);
    throw err;
  }
}

module.exports = {
  getAllMeetingDetails,
  getMeetingDetailsById,
  createMeetingDetails,
  updateMeetingDetails,
  deleteMeetingDetails,
};
