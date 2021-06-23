const express = require("express");
const router = express.Router();
const { db, Activity, Restaurant, Hotel, Place } = require("./models");

router.get("/all", async (req, res, next) => {
  try {
    const allAttractions = {};

    allAttractions.hotels = await Hotel.findAll({ include: Place });
    allAttractions.restaurants = await Restaurant.findAll({ include: Place });
    allAttractions.activities = await Activity.findAll({ include: Place });

    res.json(allAttractions);
  } catch (err) {
    next(err);
  }
});

router.post("/hotel", (req, res, next) => {
  try {
    const hotelName = req.body.hotelName;
    res.json(hotelName);
  } catch (err) {
    next(err);
  }
});

router.post("/restaurants", (req, res, next) => {
  try {
    const restaurantName = req.body.restaurantName;
    res.json(restaurantName);
  } catch (err) {
    next(err);
  }
});

router.post("/activities", (req, res, next) => {
  try {
    const activityName = req.body.activityName;
    res.json(activityName);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
