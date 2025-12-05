const InsuranceBooking = require("../models/InsuranceBooking");

// Generate unique insurance code
function generateInsuranceCode() {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `FlyDenAI-INC-${randomNum}`;
}

// CREATE INSURANCE BOOKING
exports.createInsurance = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phone,
      whatsapp,
      fromAirport,
      toAirport,
      insuranceStartDate,
      insuranceEndDate,
      travelPurpose,
      bookingId
    } = req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !whatsapp ||
      !fromAirport ||
      !toAirport ||
      !insuranceStartDate ||
      !insuranceEndDate ||
      !travelPurpose ||
      !bookingId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✔ Generate the required unique insurance code
    const insuranceCode = generateInsuranceCode();

    const booking = await InsuranceBooking.create({
      fullName,
      email,
      phone,
      whatsapp,
      fromAirport,
      toAirport,
      insuranceStartDate,
      insuranceEndDate,
      travelPurpose,
      bookingId,
      insuranceCode,  
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Insurance booking created successfully",
      data: booking,
    });

  } catch (err) {
    next(err);
  }
};


// TOGGLE FINALIZE STATUS
exports.toggleFinalize = async (req, res, next) => {
  try {
    const { bookingId } = req.params;

    let booking = await InsuranceBooking.findOne({ bookingId });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // ✔ Toggle status
    booking.status = booking.status === "Pending" ? "Finalized" : "Pending";
    await booking.save();

    res.json({
      success: true,
      message: `Booking status updated to ${booking.status}`,
      status: booking.status,
    });

  } catch (err) {
    next(err);
  }
};


// GET ALL INSURANCE BOOKINGS (ADMIN)
exports.getInsuranceBookings = async (req, res, next) => {
  try {
    const bookings = await InsuranceBooking.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: bookings,
    });
  } catch (err) {
    next(err);
  }
};


// GET SINGLE BOOKING
exports.getInsuranceById = async (req, res, next) => {
  try {
    const booking = await InsuranceBooking.findOne({
      bookingId: req.params.bookingId,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.json({
      success: true,
      data: booking,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE BOOKING
exports.deleteBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;

    const deleted = await InsuranceBooking.findOneAndDelete({ bookingId });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      message: "Booking deleted successfully",
    });

  } catch (err) {
    next(err);
  }
};
