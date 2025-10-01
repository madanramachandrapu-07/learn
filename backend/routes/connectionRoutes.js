const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Request = require("../models/Request");

// GET /api/connections
router.get("/", auth, async (req, res) => {
  try {
    const connections = await Request.find({
      status: "accepted",
      $or: [{ fromUser: req.user.id }, { toUser: req.user.id }]
    })
    .populate("fromUser", "profile email")
    .populate("toUser", "profile email");

    res.json(connections);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
