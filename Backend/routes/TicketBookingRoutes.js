const express = require("express");
const {
  createBooking,
  updatePaymentSuccess,
  updatePaymentFailed,
  getAllBookings,
  getBookingById,
  approveBooking,
  rejectBooking,
  deleteBooking
} = require("../controllers/TicketBookingController");

const router = express.Router();

// Create booking before payment
router.post("/create", createBooking);

// Payment callbacks
router.post("/payment/success", updatePaymentSuccess);
router.post("/payment/failed", updatePaymentFailed);

// Fetch bookings
router.get("/", getAllBookings);
router.get("/:id", getBookingById);

// Approve / Reject
router.put("/approve/:id", approveBooking);
router.put("/reject/:id", rejectBooking);
router.delete("/delete/:id", deleteBooking);


module.exports = router;
