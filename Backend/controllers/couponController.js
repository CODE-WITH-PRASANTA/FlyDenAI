// controllers/couponController.js
const Coupon = require("../models/Coupon");

// @desc Get all coupons
// @route GET /api/coupons
// @access Public / or Protected (your choice)
const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching coupons" });
  }
};

// @desc Create new coupon
// @route POST /api/coupons
const createCoupon = async (req, res) => {
  try {
    let { code, discount, status, validFrom, validTo, maxUsage } = req.body;

    if (!code || !discount) {
      return res.status(400).json({ message: "Code and discount are required" });
    }

    code = code.trim().toUpperCase();

    const existing = await Coupon.findOne({ code });
    if (existing) {
      return res.status(409).json({ message: "Coupon code already exists" });
    }

    const coupon = await Coupon.create({
      code,
      discount,
      status: status || "Pending",
      validFrom,
      validTo,
      maxUsage,
    });

    res.status(201).json(coupon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating coupon" });
  }
};

// @desc Update coupon
// @route PUT /api/coupons/:id
const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const { discount, status, validFrom, validTo, maxUsage } = req.body;

    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    if (discount !== undefined) coupon.discount = discount;
    if (status) coupon.status = status;
    if (validFrom) coupon.validFrom = validFrom;
    if (validTo) coupon.validTo = validTo;
    if (maxUsage !== undefined) coupon.maxUsage = maxUsage;

    const updated = await coupon.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error while updating coupon" });
  }
};

// @desc Delete coupon
// @route DELETE /api/coupons/:id
const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findById(id);

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    await coupon.deleteOne();
    res.json({ message: "Coupon deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting coupon" });
  }
};

// @desc Apply / Validate coupon
// @route POST /api/coupons/apply
// body: { code, amount }
const applyCoupon = async (req, res) => {
  try {
    let { code, amount } = req.body;

    if (!code || !amount) {
      return res
        .status(400)
        .json({ message: "Coupon code and amount are required" });
    }

    code = code.trim().toUpperCase();
    amount = Number(amount);

    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return res.status(404).json({ message: "Invalid coupon code" });
    }

    const now = new Date();

    // Status check: must be Active to apply
        if (coupon.status !== "Active") {
        return res.status(400).json({
            message:
            coupon.status === "Used"
                ? "Coupon is already used"
                : coupon.status === "Expired"
                ? "Coupon expired"
                : "Coupon is not active"
        });
        }


    // Date validity check
    if (coupon.validFrom && now < coupon.validFrom) {
      return res
        .status(400)
        .json({ message: "Coupon is not valid yet (future date)" });
    }

    if (coupon.validTo && now > coupon.validTo) {
      coupon.status = "Expired";
      await coupon.save();
      return res.status(400).json({ message: "Coupon has expired" });
    }

    // Usage limit check
    if (
      coupon.maxUsage &&
      coupon.usedCount >= coupon.maxUsage
    ) {
      coupon.status = "Used";
      await coupon.save();
      return res
        .status(400)
        .json({ message: "Coupon usage limit reached (already used)" });
    }

    // ✅ Valid coupon - calculate discount
    const discountAmount = (amount * coupon.discount) / 100;
    const finalAmount = amount - discountAmount;

    // Mark as used (single-use) or increment usage
    coupon.usedCount += 1;
    if (coupon.maxUsage && coupon.usedCount >= coupon.maxUsage) {
      coupon.status = "Used";
    }
    await coupon.save();

    return res.json({
      success: true,
      message: "Coupon applied successfully",
      coupon: {
        code: coupon.code,
        discount: coupon.discount,
        status: coupon.status,
      },
      amountDetails: {
        originalAmount: amount,
        discountAmount,
        finalAmount,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while applying coupon" });
  }
};

module.exports = {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
};
