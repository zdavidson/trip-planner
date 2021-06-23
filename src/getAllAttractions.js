import mapboxgl from "mapbox-gl";
import mapboxToken from "./mapboxToken";

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

// Populate selects & button event handler
window.addEventListener("DOMContentLoaded", () => {
  const getAllAttractions = () => {
    console.log("We are getting those attractions");

    $.ajax({ url: "/api/all", method: "GET" })
      .then((attractions) => {
        const $hotels = $("#hotel-select");
        const $restaurants = $("#restaurant-select");
        const $activities = $("#activity-select");

        const hotelOptions = attractions.hotels.map(
          (hotel) =>
            `<option id="hotel-${hotel.id}" value=${hotel.id} location=${hotel.place.location}>${hotel.name}</option>`
        );
        $hotels.append(hotelOptions);

        const restaurantOptions = attractions.restaurants.map(
          (restaurant) =>
            `<option id="restaurant-${restaurant.id}" value=${restaurant.id} location=${restaurant.place.location}>${restaurant.name}</option>`
        );
        $restaurants.append(restaurantOptions);

        const activityOptions = attractions.activities.map(
          (activity) =>
            `<option id="activity-${activity.id}" value=${activity.id} location=${activity.place.location}>${activity.name}</option>`
        );
        $activities.append(activityOptions);
      })
      .catch((error) => {
        console.error(error);
      });

    const $hotelButton = $("#hotel-button");
    $hotelButton.click(() => {
      // Name & Id
      const select = $("#hotel-select").val();
      const $selectedOption = $(`#hotel-${select}`);
      const hotelName = $($selectedOption[0]).html();

      // Location
      const hotelCoordinates =
        $selectedOption[0].attributes.location.value.split(",");
      const newLatitude = hotelCoordinates[1];
      const newLongitude = hotelCoordinates[0];

      buildMarker(newLatitude, newLongitude);

      console.log(newLongitude, newLatitude);
      console.log(hotelName);

      $.ajax({ url: "/api/hotel", method: "POST", data: { hotelName } })
        .then((selectedHotel) => {
          const $div = $("#my-hotel");
          $div.append(
            `<p>${selectedHotel}</p><button id="remove-hotel-${select}" class="btn btn-danger">x</button>`
          );
        })
        .catch((error) => {
          console.error(error);
        });
    });

    const $restaurantButton = $("#restaurant-button");
    $restaurantButton.click(() => {
      const select = $("#restaurant-select").val();
      const $selectedOption = $(`#restaurant-${select}`);
      const restaurantName = $($selectedOption[0]).html();

      // Location
      const restaurantCoordinates =
        $selectedOption[0].attributes.location.value.split(",");
      const newLatitude = restaurantCoordinates[1];
      const newLongitude = restaurantCoordinates[0];

      buildMarker(newLatitude, newLongitude);

      console.log(restaurantName);

      $.ajax({
        url: "/api/restaurants",
        method: "POST",
        data: { restaurantName },
      })
        .then((selectedRestaurant) => {
          const $div = $("#my-restaurants");
          $div.append(
            `<p>${selectedRestaurant}</p><button id="remove-restaurant-${select}" class="btn btn-danger">x</button>`
          );
        })
        .catch((error) => {
          console.error(error);
        });
    });

    const $activityButton = $("#activity-button");
    $activityButton.click(() => {
      const select = $("#activity-select").val();
      const $selectedOption = $(`#activity-${select}`);
      const activityName = $($selectedOption[0]).html();

      // Location
      const activityCoordinates =
        $selectedOption[0].attributes.location.value.split(",");
      const newLatitude = activityCoordinates[1];
      const newLongitude = activityCoordinates[0];

      buildMarker(newLatitude, newLongitude);

      console.log(activityName);

      $.ajax({
        url: "/api/activities",
        method: "POST",
        data: { activityName },
      })
        .then((selectedActivity) => {
          const $div = $("#my-activities");
          $div.append(
            `<p>${selectedActivity}</p><button id="remove-activity-${select}" class="btn btn-danger">x</button>`
          );
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  getAllAttractions();
});
