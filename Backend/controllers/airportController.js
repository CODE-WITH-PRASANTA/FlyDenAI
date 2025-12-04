const Airport = require("../models/Airport");

/**
 * Create new airport
 * POST /api/airports
 * body: { airportName, countryName }
 */
exports.createAirport = async (req, res, next) => {
  try {
    const { airportName, countryName } = req.body;
    if (!airportName || !countryName) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const airport = new Airport({ airportName, countryName });
    await airport.save();

    return res.status(201).json({ success: true, data: airport });
  } catch (err) {
    next(err);
  }
};

/**
 * Get airports with search + pagination
 * GET /api/airports?search=&page=1&limit=7
 */
exports.getAirports = async (req, res, next) => {
  try {
    const search = (req.query.search || "").toString().trim();
    const page = parseInt(req.query.page || "1");
    const limit = parseInt(req.query.limit || "7");
    const skip = (page - 1) * limit;

    const query = {};
    if (search) {
      const re = new RegExp(search, "i");
      query.$or = [{ airportName: re }, { countryName: re }];
    }

    const [total, items] = await Promise.all([
      Airport.countDocuments(query),
      Airport.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit)
    ]);

    return res.json({
      success: true,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      data: items
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Update airport
 * PUT /api/airports/:id
 * body: { airportName, countryName }
 */
exports.updateAirport = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { airportName, countryName } = req.body;

    const updated = await Airport.findByIdAndUpdate(
      id,
      { airportName, countryName },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Airport not found" });
    }

    return res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete airport
 * DELETE /api/airports/:id
 */
exports.deleteAirport = async (req, res, next) => {
  try {
    const id = req.params.id;
    const removed = await Airport.findByIdAndDelete(id);
    if (!removed) {
      return res.status(404).json({ success: false, message: "Airport not found" });
    }
    return res.json({ success: true, message: "Airport deleted" });
  } catch (err) {
    next(err);
  }
};
