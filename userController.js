// const pool = require('../config/db');

// exports.register = async (req, res) => {
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
// };

// exports.signIn = async (req, res) => {
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
// };

const pool = require('../config/db');

// Register User
const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
};

// Sign-in User
const signInUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );
    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Sign-in successful', user: result.rows[0] });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Sign-in failed', details: err.message });
  }
};

module.exports = { registerUser, signInUser };
