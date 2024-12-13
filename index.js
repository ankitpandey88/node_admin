
// const express = require('express');
// const { Pool } = require('pg');
// const bodyParser = require('body-parser');

// // Initialize Express app
// const app = express();
// const port = 3000;

// // Middleware
// app.use(bodyParser.json());

// // PostgreSQL connection configuration
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'demodb',
//   password: 'Ankit@#.123',
//   port: 5432,
// });

// // Connect to PostgreSQL
// pool.connect()
//   .then(() => console.log('Connected to PostgreSQL'))
//   .catch(err => console.error('Connection error', err));

// // Create Users Table
// pool.query(`
//   CREATE TABLE IF NOT EXISTS users (
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(50) UNIQUE NOT NULL,
//     password VARCHAR(100) NOT NULL
//   );
// `, (err, res) => {
//   if (err) {
//     console.error('Error creating table', err);
//   } else {
//     console.log('Table created successfully');
//   }
// });

// // Create Jobs Table
// pool.query(`
//   CREATE TABLE IF NOT EXISTS jobs (
//     id SERIAL PRIMARY KEY,
//     title VARCHAR(100) NOT NULL,
//     description TEXT NOT NULL
//   );
// `, (err, res) => {
//   if (err) {
//     console.error('Error creating jobs table', err);
//   } else {
//     console.log('Jobs table created successfully');
//   }
// });

// // Registration API
// app.post('/register', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const result = await pool.query(
//       'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
//       [username, password]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: 'Registration failed', details: err.message });
//   }
// });

// // Sign-in API
// app.post('/signin', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const result = await pool.query(
//       'SELECT * FROM users WHERE username = $1 AND password = $2',
//       [username, password]
//     );
//     if (result.rows.length > 0) {
//       res.status(200).json({ message: 'Sign-in successful', user: result.rows[0] });
//     } else {
//       res.status(401).json({ error: 'Invalid username or password' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: 'Sign-in failed', details: err.message });
//   }
// });

// // Create Job Post API
// app.post('/create-job', async (req, res) => {
//   const { title, description } = req.body;
//   try {
//     const result = await pool.query(
//       'INSERT INTO jobs (title, description) VALUES ($1, $2) RETURNING *',
//       [title, description]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: 'Job creation failed', details: err.message });
//   }
// });

// // Fetch Jobs API
// app.get('/jobs', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM jobs');
//     res.status(200).json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch jobs', details: err.message });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const pool = require('./config/db'); // Ensure tables are created

// Initialize Express app
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api', jobRoutes);

// Create Database Tables
const initializeTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL
      );
    `);
    console.log('Users table created or already exists.');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT NOT NULL
      );
    `);
    console.log('Jobs table created or already exists.');
  } catch (err) {
    console.error('Error initializing tables', err);
  }
};

// Ensure tables are initialized
initializeTables().catch(err => console.error('Failed to initialize tables:', err));

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
