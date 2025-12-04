const express = require("express");
const router = express.Router();
const airportController = require("../controllers/airportController");
const { body, param, query } = require("express-validator");

// Create
router.post(
  "/",
  [
    body("airportName").isString().trim().notEmpty().withMessage("airportName required"),
    body("countryName").isString().trim().notEmpty().withMessage("countryName required")
  ],
  // custom validation result handled in server (simple)
  airportController.createAirport
);

// Read - list with search & pagination
router.get(
  "/",
  [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1 })
  ],
  airportController.getAirports
);

// Update
router.put(
  "/:id",
  [
    param("id").isMongoId().withMessage("Invalid id"),
    body("airportName").optional().isString().trim(),
    body("countryName").optional().isString().trim()
  ],
  airportController.updateAirport
);

// Delete
router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid id")],
  airportController.deleteAirport
);

module.exports = router;
