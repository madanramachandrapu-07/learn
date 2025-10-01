const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Create a secret for JWT
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// @route POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { email, password, phoneNumber } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Creating a new user instance
    user = new User({
      email,
      password,
      phoneNumber,
      profile: {}
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Saving the user to the database
    await user.save();

    // Creating and sign a JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, msg: 'Registration successful. Redirect to profile setup.' });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route POST /api/auth/signin
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Creating and sign a JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, msg: 'Login successful. Redirect to homepage.' });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;