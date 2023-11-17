const { ObjectId } = require('mongodb');
const { initDb } = require('../database/db.connection');

const initCollection = async () => {
  try {
    const db = await initDb();
    if (!db) {
      throw new Error('Database connection not available.');
    }

    const collection = db.collection('meetingDetails');
    console.log('Collection initialized successfully.');
    return collection;
  } catch (error) {
    console.error('Error initializing collection:', error);
    throw error;
  }
};

//-----------------------------------

const getAllMeetingDetails = async (req, res) => {
  try {
    const collection = await initCollection();
    const meetingDetails = await collection.find().toArray();
    res.json(meetingDetails);
  } catch (error) {
    console.error('Error getting meeting details:', error);
    res.status(500).send('Internal Server Error');
  }
};

//-----------------------------------

// Function to get the database instance
const getDb = async () => {
  try {
    const db = await initDb();
    return db;
  } catch (error) {
    console.error('Error getting database:', error);
    throw error;
  }
};

// Function to get meeting details by ID
const getMeetingDetailsById = async (req, res) => {
  const meetingId = req.params.id;

  try {
    const db = await getDb();

    // Ensure the collection is retrieved from the database
    const collection = db.collection('meetingDetails');
    
    const meeting = await collection.findOne({ _id: new ObjectId(meetingId) }); // Corrigido aqui

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    res.status(200).json(meeting);
  } catch (error) {
    console.error('Error fetching meeting details by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//-----------------------------------


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

//-----------------------------------

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


//-----------------------------------

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
