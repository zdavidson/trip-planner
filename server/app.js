const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const { db, Activity, Restaurant, Hotel, Place } = require("./models");

// Database
db.authenticate().then(() => console.log("Connected to the database"));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "..", "node_modules")));
app.use(express.static(path.join(__dirname, "..", "/public")));

app.get("/api/all", async (req, res, next) => {
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

app.use((req, res, next) => {
  const err = new Error("Not Found");
  console.error(err);
  res.status(404).send("Page was not found");
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("There's been an error");
});

const init = async () => {
  await db.sync();
  await Place.sync();
  await Activity.sync();
  await Restaurant.sync();
  await Hotel.sync();

  app.listen(8080, () => {
    console.log("Listening on PORT 8080");
  });
};

init();
