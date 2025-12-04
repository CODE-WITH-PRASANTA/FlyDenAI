const express = require("express");
const router = express.Router();
const priceController = require("../controllers/priceController");
const { body } = require("express-validator");

router.get("/", priceController.getTicketPrice);

router.post(
  "/",
  [body("ticketPrice").exists().withMessage("ticketPrice is required")],
  priceController.setTicketPrice
);

module.exports = router;
