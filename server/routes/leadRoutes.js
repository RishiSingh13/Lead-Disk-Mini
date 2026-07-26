const express = require("express");

const {
  createLead,
  getAllLeads,
  getLeadById,
  updateLeadStatus,
  deleteLead,
} = require("../controllers/leadController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createLead);

router.get("/", authMiddleware, getAllLeads);

router.get("/:id", authMiddleware, getLeadById);

router.patch("/:id", authMiddleware, updateLeadStatus);

router.delete("/:id", authMiddleware, deleteLead);

module.exports = router;