const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   POST /api/profile
// @access  Private (requires a JWT)
router.post('/', auth, async (req, res) => {
    const {
        fullName,
        username,
        phoneNumber,
        location,
        bio,
        skillsOffered,
        skillsToLearn,
        availability,
        socialLinks
    } = req.body;

    const profileFields = {};
    if (fullName) profileFields.fullName = fullName;
    if (username) profileFields.username = username;
    if (phoneNumber) profileFields.phoneNumber = phoneNumber;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (skillsOffered) profileFields.skillsOffered = skillsOffered;
    if (skillsToLearn) profileFields.skillsToLearn = skillsToLearn;
    if (availability) profileFields.availability = availability;
    if (socialLinks) profileFields.socialLinks = socialLinks;

    try {
        let user = await User.findOneAndUpdate(
            { _id: req.user.id },
            { $set: { profile: profileFields } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route-->   GET /api/profile

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/profile/category/:category
// @desc    Get all users who have skills under a specific category
// @access  Public (you may want to protect later with auth)
router.get('/category/:category', async (req, res) => {
  try {
    const category = req.params.category;

    const users = await User.find({
      $or: [
        { "profile.skillsOffered.category": category },
        { "profile.skillsToLearn.category": category }
      ]
    }).select("-password");

    if (!users.length) {
      return res.status(404).json({ msg: "No users found in this category" });
    }

    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching users by category:", err.message);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
