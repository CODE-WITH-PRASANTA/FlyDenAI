const Setting = require("../models/Setting");

/**
 * Get ticket price
 * GET /api/price
 */
exports.getTicketPrice = async (req, res, next) => {
  try {
    const doc = await Setting.findOne({ key: "ticketPrice" });
    const price = doc ? doc.value : null;
    return res.json({ success: true, data: { ticketPrice: price } });
  } catch (err) {
    next(err);
  }
};

/**
 * Set or update ticket price
 * POST /api/price
 * body: { ticketPrice }
 */
exports.setTicketPrice = async (req, res, next) => {
  try {
    const { ticketPrice } = req.body;
    if (ticketPrice === undefined) {
      return res.status(400).json({ success: false, message: "ticketPrice required" });
    }

    const updated = await Setting.findOneAndUpdate(
      { key: "ticketPrice" },
      { value: ticketPrice },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};
