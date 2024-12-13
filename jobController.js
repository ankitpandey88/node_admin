const pool = require('../config/db');

// Create Job Post
const createJob = async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO jobs (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Job creation failed', details: err.message });
  }
};

// Fetch All Jobs
const fetchJobs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jobs');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs', details: err.message });
  }
};

module.exports = { createJob, fetchJobs };
