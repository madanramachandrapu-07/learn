const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

// ✅ Get user by ID (for chat, connections, etc.)
// router.get("/:id", auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).select("-password"); // exclude password
//     if (!user) return res.status(404).json({ msg: "User not found" });
//     res.json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// });

router.get("/:id", auth, async (req, res) => {
  try {
    let user;
    if (req.params.id === "me") {
      // return the currently logged in user
      user = await User.findById(req.user.id).select("-password");
    } else {
      user = await User.findById(req.params.id).select("-password");
    }

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});



module.exports = router;
