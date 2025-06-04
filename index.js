const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables
const createTables = require('./src/db/tables'); // Import database table creation logic
const userRoutes = require('./src/routes/userRoutes'); // Import user routes
const playerRoutes = require('./src/routes/playerRoutes'); // Adjust path if necessary


const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/users', userRoutes); // Mount the user routes at /users
app.use('/players', playerRoutes);


// Root route for basic API health check
app.get('/', (req, res) => {
  res.send('Welcome to the Fantasy Football API!');
});

// Start server and create tables on initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await createTables(); // Create tables if they don't exist
  console.log(`Server running on port ${PORT}`);
});
