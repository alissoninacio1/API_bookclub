// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

//the code below will be used for oauth
// const dotenv = require('dotenv');
// dotenv.config();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger-output.json");

//importing routes
const booksRoutes = require('./routes/books');
const clubsRoutes = require('./routes/clubs');
const meetingsRoutes = require('./routes/meetings');
const membersRoutes = require('./routes/members');


app.use(cors());
app.use(express.json());


app.use("/api-docs", swaggerUi.serve)
  .use("/api-docs", swaggerUi.setup(swaggerDocument))


//---oauth code ---

//end oauth code

app.use('/books', booksRoutes); 
app.use('/clubs', clubsRoutes);
app.use('/meetings', meetingsRoutes);
app.use('/members', membersRoutes);




// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Middleware for handling undefined routes
app.use((req, res, next) => {
  res.status(404).send('Route not found');
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});