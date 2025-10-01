const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String
  },
  profile: {
    fullName: String,
    username: String,
    location: String,
    bio: String,
    skillsOffered: [
    {
      skillName: { type: String, required: true },
      level: { type: String, required: true },
      category: { type: [String], default: [] }
    }
    ],
    skillsToLearn: [
      {
        skillName: { type: String, required: true },
        level: { type: String, required: true },
        category: { type: [String], default: [] }
      }
    ],

    availability: {
      days: [String],
      time: String,
      timezone: String
    },
    socialLinks: {
      linkedin: String,
      github: String
    }
  }
});

module.exports = mongoose.model('User', UserSchema);