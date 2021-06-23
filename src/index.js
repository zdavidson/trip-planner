import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiemRhdmlkc29uIiwiYSI6ImNrcTQ4YzVuNzA3d28ybnFuNWtzNnl1cXAifQ.wpS_SVtPi7HbCFEbTT5VbA";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v10",
  center: [-74.006, 40.7128],
  zoom: 12,
});

const newMarker = (latitude, longitude, userColor) =>
  new mapboxgl.Marker({ color: userColor })
    .setLngLat([latitude, longitude])
    .addTo(map);

const marker = newMarker(-74.006, 40.7128);

// Main
$(document).ready(() => {
  const getAllAttractions = () => {
    // Get All Options
    $.ajax({ url: "/api/all", method: "GET" })
      .then((attractions) => {
        const hotelOptions = attractions.hotels.map(
          (hotel) =>
            `<option id="hotel-${hotel.id}" value=${hotel.id} location=${hotel.place.location}>${hotel.name}</option>`
        );
        const restaurantOptions = attractions.restaurants.map(
          (restaurant) =>
            `<option id="restaurant-${restaurant.id}" value=${restaurant.id} location=${restaurant.place.location}>${restaurant.name}</option>`
        );
        const activityOptions = attractions.activities.map(
          (activity) =>
            `<option id="activity-${activity.id}" value=${activity.id} location=${activity.place.location}>${activity.name}</option>`
        );

        $("#hotel-select").append(hotelOptions);
        $("#restaurant-select").append(restaurantOptions);
        $("#activity-select").append(activityOptions);
      })
      .catch((error) => {
        console.error(error);
      });

    // Hotel Select
    $("#hotel-button").click(() => {
      // Name & Id
      const select = $("#hotel-select").val();
      const $selectedOption = $(`#hotel-${select}`);
      const hotelName = $($selectedOption[0]).html();

      // Location
      const hotelCoordinates =
        $selectedOption[0].attributes.location.value.split(",");

      // Marker
      const hotelMarker = newMarker(
        hotelCoordinates[1],
        hotelCoordinates[0],
        "#008000"
      );

      // Lower Div
      const $div = $("#my-hotel");

      // Add Selection
      $.ajax({ url: "/api/hotel", method: "POST", data: { hotelName } })
        .then((selectedHotel) => {
          $div.append(
            `<div><p class="new-hotel">${selectedHotel}</p> <button id="remove-hotel-${select}" class="btn btn-danger">x</button></div>`
          );
        })
        .catch((error) => {
          console.error(error);
        });

      $div.on("click", "button", () => {
        $("#my-hotel p").remove();
        $("#my-hotel button").remove();
        hotelMarker.remove();
      });
    });

    // Restaurant Select
    $("#restaurant-button").click(() => {
      // Name & ID
      const select = $("#restaurant-select").val();
      const $selectedOption = $(`#restaurant-${select}`);
      const restaurantName = $($selectedOption[0]).html();

      // Location
      const restaurantCoordinates =
        $selectedOption[0].attributes.location.value.split(",");

      // Marker
      const restaurantMarker = newMarker(
        restaurantCoordinates[1],
        restaurantCoordinates[0],
        "#6a0dad"
      );

      // Lower Div
      const $div = $("#my-restaurants");

      // Add Selection
      $.ajax({
        url: "/api/restaurants",
        method: "POST",
        data: { restaurantName },
      })
        .then((selectedRestaurant) => {
          $div.append(
            `<div><p class="new-restaurant">${selectedRestaurant}</p> <button id="remove-restaurant-${select}" class="btn btn-danger">x</button></div>`
          );
        })
        .catch((error) => {
          console.error(error);
        });

      // Remove Selection
      $div.on("click", "button", () => {
        $("#my-restaurants div p").remove();
        $("#my-restaurants button").remove();
        restaurantMarker.remove();
      });
    });

    // Activity Select
    $("#activity-button").click(() => {
      // Name & ID
      const select = $("#activity-select").val();
      const $selectedOption = $(`#activity-${select}`);
      const activityName = $($selectedOption[0]).html();

      // Location
      const activityCoordinates =
        $selectedOption[0].attributes.location.value.split(",");

      // Marker
      const activityMarker = newMarker(
        activityCoordinates[1],
        activityCoordinates[0],
        "#FFA500"
      );

      // Lower Div
      const $div = $("#my-activities");

      // Add Selection
      $.ajax({
        url: "/api/activities",
        method: "POST",
        data: { activityName },
      })
        .then((selectedActivity) => {
          $div.append(
            `<div><p class="new-activity">${selectedActivity}</p> <button id="remove-activity-${select}" class="btn btn-danger">x</button></div>`
          );
        })
        .catch((error) => {
          console.error(error);
        });

      // Remove Selection
      $div.on("click", "button", () => {
        $("#my-activities div p").remove();
        $("#my-activities button").remove();
        activityMarker.remove();
      });
    });
  };
  getAllAttractions();
});

// TODO:
// Make markers reflect type of attraction
// When new marker is added, screen zooms in to it
// Save Itinerary should save setup to a new route //localhost:8080/:savedItineraryId
// -- This needs to save to the database(?) to be accessed again by the user
// Clean up styling when complete
