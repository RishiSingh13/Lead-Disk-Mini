const express = require("express");

const {
  loginAdmin,
  logoutAdmin,
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", loginAdmin);

router.post("/logout", logoutAdmin);

module.exports = router;