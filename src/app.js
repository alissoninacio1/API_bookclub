// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

const bodyParser = require('body-parser');
const meetingsRoutes = require('./routes/meetings');

app.use(cors());

// Middleware para análise do corpo da solicitação
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/', meetingsRoutes);
app.use('/meetings', meetingsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
