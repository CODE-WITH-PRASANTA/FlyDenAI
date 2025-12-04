const nodemailer = require("nodemailer");
require("dotenv").config();

const TicketBooking = require("../models/TicketBooking");
const dummyTicketSuccessEmailTemplate = require("../emails/templates/dummyTicketPaymentSuccessTemplate");
const approveTemplate = require("../emails/templates/dummyTicketApproveEmailTemplate");
const rejectTemplate = require("../emails/templates/dummyTicketRejectEmailTemplate");
const transporter = require("../emails/emailTransporter");

/* ---------------------------------------------------
   UNIVERSAL EMAIL SENDER FUNCTION
--------------------------------------------------- */
const sendUniversalEmail = async ({ to, subject, html }) => {
  try {
    if (!to) throw new Error("Recipient email missing");

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    return { success: true };
  } catch (err) {
    console.error("Email Sending Error:", err);
    return { success: false, error: err.message };
  }
};

/* ---------------------------------------------------
   1. CREATE BOOKING
--------------------------------------------------- */
const createBooking = async (req, res) => {
  try {
    const { customer, passengers, bookingData, priceDetails } = req.body;

    const booking = await TicketBooking.create({
      customer,
      passengers,
      bookingData,
      priceDetails,
    });

    res.status(201).json({
      success: true,
      message: "Booking data stored successfully (PENDING).",
      bookingId: booking._id,
    });

  } catch (err) {
    console.error("Create Booking Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to store booking data.",
    });
  }
};

/* ---------------------------------------------------
   2. PAYMENT SUCCESS 
--------------------------------------------------- */
const updatePaymentSuccess = async (req, res) => {
  try {
    const { bookingId, transactionId, providerReferenceId } = req.body;

    const booking = await TicketBooking.findByIdAndUpdate(
      bookingId,
      {
        paymentStatus: "SUCCESS",
        paymentInfo: { transactionId, providerReferenceId },
      },
      { new: true }
    );

    if (!booking)
      return res.status(404).json({ success: false, message: "Booking not found" });

    // Prepare email template
    const html = dummyTicketSuccessEmailTemplate(
      booking.customer,
      booking.bookingData,
      booking.passengers,
      booking.priceDetails
    );

    // Send success email
    await sendUniversalEmail({
      to: booking.customer.email,
      subject: "Payment Successful - Your Booking Confirmation",
      html,
    });

    res.json({
      success: true,
      message: "Payment success updated & email sent",
      data: booking,
    });

  } catch (err) {
    console.error("Payment Success Update Error:", err);
    res.status(500).json({
      success: false,
      message: "Error updating payment success.",
      error: err,
    });
  }
};

/* ---------------------------------------------------
   3. PAYMENT FAILED
--------------------------------------------------- */
const updatePaymentFailed = async (req, res) => {
  try {
    const { bookingId } = req.body;

    await TicketBooking.findByIdAndUpdate(bookingId, {
      paymentStatus: "FAILED",
    });

    res.json({ success: true, message: "Payment failed updated." });

  } catch (err) {
    console.error("Payment Failed Update Error:", err);
    res.status(500).json({
      success: false,
      message: "Error updating payment status.",
    });
  }
};

/* ---------------------------------------------------
   4. GET ALL BOOKINGS
--------------------------------------------------- */
const getAllBookings = async (req, res) => {
  try {
    const { search, status, approve } = req.query;

    const query = {};

    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [
        { "customer.name": regex },
        { "customer.email": regex },
        { "customer.phone": regex },
      ];
    }

    if (status) query.paymentStatus = status;
    if (approve) query.approveStatus = approve;

    const bookings = await TicketBooking.find(query).sort({ createdAt: -1 });

    res.json({ success: true, data: bookings });

  } catch (err) {
    console.error("Get All Bookings Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

/* ---------------------------------------------------
   5. GET BOOKING BY ID
--------------------------------------------------- */
const getBookingById = async (req, res) => {
  try {
    const booking = await TicketBooking.findById(req.params.id);

    if (!booking)
      return res.status(404).json({ success: false, message: "Booking not found" });

    res.json({ success: true, data: booking });

  } catch (err) {
    console.error("Get Booking Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch booking",
    });
  }
};

/* ---------------------------------------------------
   6. APPROVE BOOKING (with email)
--------------------------------------------------- */
const approveBooking = async (req, res) => {
  try {
    const booking = await TicketBooking.findByIdAndUpdate(
      req.params.id,
      { approveStatus: "APPROVED" },
      { new: true }
    );

    if (!booking)
      return res.status(404).json({ success: false, message: "Booking not found" });

    // Prepare Approval Email Template
    const html = approveTemplate(
      booking.customer,
      booking.bookingData,
      booking.passengers
    );

    // Send approve email
    await sendUniversalEmail({
      to: booking.customer.email,
      subject: "Your Booking Has Been Approved",
      html,
    });

    res.json({
      success: true,
      message: "Booking approved & email sent successfully",
      data: booking,
    });

  } catch (err) {
    console.error("Approve Booking Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to approve booking",
    });
  }
};

/* ---------------------------------------------------
   7. REJECT BOOKING (with email)
--------------------------------------------------- */
const rejectBooking = async (req, res) => {
  try {
    const booking = await TicketBooking.findByIdAndUpdate(
      req.params.id,
      { approveStatus: "REJECTED" },
      { new: true }
    );

    if (!booking)
      return res.status(404).json({ success: false, message: "Booking not found" });

    // Prepare Reject Email Template
    const html = rejectTemplate(booking.customer);

    // Send reject email
    await sendUniversalEmail({
      to: booking.customer.email,
      subject: "Your Dummy Ticket Request Was Rejected",
      html,
    });

    res.json({
      success: true,
      message: "Booking rejected & email sent successfully",
      data: booking,
    });

  } catch (err) {
    console.error("Reject Booking Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to reject booking",
    });
  }
};

/* ---------------------------------------------------
   8. DELETE BOOKING
--------------------------------------------------- */
const deleteBooking = async (req, res) => {
  try {
    const booking = await TicketBooking.findByIdAndDelete(req.params.id);

    if (!booking)
      return res.status(404).json({ success: false, message: "Booking not found" });

    res.json({
      success: true,
      message: "Booking deleted successfully",
    });

  } catch (err) {
    console.error("Delete Booking Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete booking",
    });
  }
};

/* ---------------------------------------------------
   EXPORT FUNCTIONS
--------------------------------------------------- */
module.exports = {
  createBooking,
  updatePaymentSuccess,
  updatePaymentFailed,
  getAllBookings,
  getBookingById,
  approveBooking,
  rejectBooking,
  deleteBooking,
};
