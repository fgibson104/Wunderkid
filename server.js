const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const pool = require('./db/db');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config();

console.log(process.env.DB_USER); // Should log 'Fergus'
console.log(process.env.DB_NAME); // Should log 'wunderkids'
console.log(process.env.DB_PORT); // Should log '5432'

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ connectedAt: result.rows[0].now });
    } catch (err) {
        console.error('Database connection error:', err);
        res.status(500).send('Database connection failed');
    }
});

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
