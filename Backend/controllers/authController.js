const jwt = require("jsonwebtoken");

// Helper to generate JWT
function generateToken(payload, expiresInSeconds) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresInSeconds,
  });
}

// POST /api/auth/login
// Body: { email, password }
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
      errors: [{ msg: "Email and password are required." }],
    });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Simple static admin validation
  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password.",
      errors: [{ msg: "Invalid email or password." }],
    });
  }

  const expiresIn = parseInt(process.env.JWT_EXPIRES_IN || "172800", 10); // seconds

  const payload = {
    id: "admin-1",
    email: adminEmail,
    role: "admin",
    name: "FlyDen Admin",
  };

  const token = generateToken(payload, expiresIn);

  return res.json({
    success: true,
    message: "Login successful.",
    token,
    expiresIn,
    user: {
      email: adminEmail,
      role: "admin",
      name: "FlyDen Admin",
    },
  });
};

// GET /api/auth/me
exports.getProfile = (req, res) => {
  return res.json({
    success: true,
    user: req.user,
  });
};

// GET /api/auth/verify
exports.verifyToken = (req, res) => {
  return res.json({
    success: true,
    valid: true,
    user: req.user,
  });
};

// POST /api/auth/logout
// For JWT, logout = frontend removes token.
// Here we just respond success.
exports.logout = (req, res) => {
  return res.json({
    success: true,
    message: "Logged out successfully.",
  });
};
