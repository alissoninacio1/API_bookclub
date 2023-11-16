const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

const db  = require('./database/db.connection')

app.use(cors());




// Middleware to initialize the database connection before handling requests
//only for test
app.use(async (req, res, next) => {
    try {
      await db.initDb();
      next();
    } catch (error) {
      console.error('Error initializing database:', error);
      res.status(500).send('Internal Server Error');
    }
  });


//only for test 
app.get('/', (req, res) => {
    res.send("hello world!");
});

app.listen(PORT);
