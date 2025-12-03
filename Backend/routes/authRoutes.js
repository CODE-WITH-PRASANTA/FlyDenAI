const express = require("express");
const router = express.Router();
const {
  login,
  getProfile,
  verifyToken,
  logout,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// POST /api/auth/login  → login with email + password
router.post("/login", login);

// GET /api/auth/me      → get current user (protected)
router.get("/me", authMiddleware, getProfile);

// GET /api/auth/verify  → verify token (protected)
router.get("/verify", authMiddleware, verifyToken);

// POST /api/auth/logout → frontend will clear token/cookie
router.post("/logout", authMiddleware, logout);

module.exports = router;
