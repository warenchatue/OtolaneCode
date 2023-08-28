const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db');
const todoApi = require('./api/todoApi');

const app = express();
const cors = require('cors'); // Import the cors package

// Enable CORS for all routes
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to the database
connectDB().catch((err) => {
  console.error('Error connecting to the database:', err);
  process.exit(1);
});

app.use('/api', todoApi);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
