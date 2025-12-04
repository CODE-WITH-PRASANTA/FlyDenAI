// -----------------------------------------
// SERVER.JS — FINAL CLEAN MERGED VERSION
// -----------------------------------------

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// ---------- CONNECT DATABASE ----------
connectDB();

const app = express();

// ---------- GLOBAL MIDDLEWARE ----------
app.use(
  cors({
    origin: ["http://localhost:5174"], // your frontend domain
    credentials: true,
  })
);

app.use(express.json());

// ---------- STATIC UPLOADS ----------
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// -----------------------------------------
// IMPORT ALL ROUTES
// -----------------------------------------

// Admin Auth (NEW)
const authRoutes = require("./routes/authRoutes");

// Existing Project Routes
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
const airportRoutes = require("./routes/airportRoutes");
const priceRoutes = require("./routes/priceRoutes");
const ticketPaymentRoutes = require("./routes/ticketPaymentRoutes");
const TicketBookingRoutes = require("./routes/TicketBookingRoutes");

// -----------------------------------------
// USE ROUTES
// -----------------------------------------

// Admin authentication
app.use("/api/auth", authRoutes);

// Your existing APIs
app.use("/api/countries", countryRoutes);
app.use("/api/visatypes", visaTypeRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/teammembers", teamMemberRoutes);
app.use("/api/visas", visaRoutes);
app.use("/api/director", DirectorRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/airports", airportRoutes);
app.use("/api/price", priceRoutes);
app.use("/api/ticket-payment", ticketPaymentRoutes);
app.use("/api/ticket-booking", TicketBookingRoutes);



// -----------------------------------------
// DEFAULT ROUTE
// -----------------------------------------
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 FlyDenAi Server API is running successfully...",
  });
});

// -----------------------------------------
// 404 HANDLER
// -----------------------------------------
app.use((req, res) => {
  res.status(404).json({ message: "Route not found!" });
});

// -----------------------------------------
// START SERVER
// -----------------------------------------
const PORT = process.env.PORT || 6003;
app.listen(PORT, () =>
  console.log(`🔥 Server running on http://localhost:${PORT}`)
);
