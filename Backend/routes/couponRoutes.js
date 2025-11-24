// routes/couponRoutes.js
const express = require("express");
const router = express.Router();
const {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
} = require("../controllers/couponController");

// GET all coupons
router.get("/", getCoupons);

// CREATE new coupon
router.post("/", createCoupon);

// UPDATE coupon
router.put("/:id", updateCoupon);

// DELETE coupon
router.delete("/:id", deleteCoupon);

// APPLY / VALIDATE coupon
router.post("/apply", applyCoupon);

module.exports = router;
