const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// Load env vars
dotenv.config({ path: "./.env" });

// Connect to DB
connectDB();

// Init app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));


// ✅ Import routes
const countryRoutes = require("./routes/countryRoutes");
const visaTypeRoutes = require("./routes/visaTypeRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const contactRoutes = require("./routes/contactRoutes");
const teamMemberRoutes = require("./routes/teamMemberRoutes");
const visaRoutes = require("./routes/visaRoutes");
const DirectorRoutes = require("./routes/DirectorRoutes");
const blogRoutes = require("./routes/blogRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const couponRoutes = require("./routes/couponRoutes");
const applicationRoutes = require("./routes/applicationRoutes");


// ✅ Use routes
app.use("/api/countries", countryRoutes);
app.use("/api/visatypes", visaTypeRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/teammembers", teamMemberRoutes);
app.use("/api/visas", visaRoutes);
app.use("/api/director", DirectorRoutes);
app.use('/api/blogs', blogRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/applications", applicationRoutes);

// Default route
app.get("/", (req, res) => {
  res.status(200).send("🚀 API is running successfully...");
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: "Route not found!" });
});

// Start server
const PORT = process.env.PORT || 6003;
app.listen(PORT, () =>
  console.log(`🔥 Server running on http://localhost:${PORT}`)
);
