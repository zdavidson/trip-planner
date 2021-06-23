import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiemRhdmlkc29uIiwiYSI6ImNrcTQ4YzVuNzA3d28ybnFuNWtzNnl1cXAifQ.wpS_SVtPi7HbCFEbTT5VbA";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v10",
  center: [-74.006, 40.7128],
  zoom: 12,
});

const buildMarker = (latitude, longitude) => {
  new mapboxgl.Marker().setLngLat([latitude, longitude]).addTo(map);
};

const marker = buildMarker(-74.006, 40.7128);

window.addEventListener("DOMContentLoaded", () => {
  const getAllAttractions = () => {
    console.log("We are getting those attractions");

    $.ajax({ url: "/api/all", method: "GET" }).then((attractions) => {
      const $hotels = $("#hotel-select");
      const $restaurants = $("#restaurant-select");
      const $activities = $("#activity-select");

      const hotelOptions = attractions.hotels.map(
        (hotel) => `<option>${hotel.name}</option>`
      );
      $hotels.append(hotelOptions);

      const restaurantOptions = attractions.restaurants.map(
        (restaurant) => `<option>${restaurant.name}</option>`
      );
      $restaurants.append(restaurantOptions);

      const activityOptions = attractions.activities.map(
        (activity) => `<option>${activity.name}</option>`
      );
      $activities.append(activityOptions);
    });
  };

  getAllAttractions();
});
