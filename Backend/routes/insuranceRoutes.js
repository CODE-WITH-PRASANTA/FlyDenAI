const express = require("express");
const router = express.Router();
const insuranceController = require("../controllers/insuranceController");

// Create Booking
router.post("/create", insuranceController.createInsurance);

// Admin: Get All Bookings
router.get("/", insuranceController.getInsuranceBookings);

// Get Single Booking
router.get("/:bookingId", insuranceController.getInsuranceById);

// NEW — Finalize Toggle
router.put("/finalize/:bookingId", insuranceController.toggleFinalize); 

router.delete("/:bookingId", insuranceController.deleteBooking);


module.exports = router;
