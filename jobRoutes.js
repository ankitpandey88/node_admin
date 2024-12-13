const express = require('express');
const { createJob, fetchJobs } = require('../controllers/jobController');
const router = express.Router();

// Job Routes
router.post('/create-job', createJob);
router.get('/jobs', fetchJobs);

module.exports = router;
