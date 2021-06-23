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
            `<option id="hotel-${hotel.id}"value=${hotel.id}>${hotel.name}</option>`
        );
        $hotels.append(hotelOptions);

        const restaurantOptions = attractions.restaurants.map(
          (restaurant) =>
            `<option value=${restaurant.id}">${restaurant.name}</option>`
        );
        $restaurants.append(restaurantOptions);

        const activityOptions = attractions.activities.map(
          (activity) => `<option value=${activity.id}>${activity.name}</option>`
        );
        $activities.append(activityOptions);
      })
      .catch((error) => {
        console.error(error);
      });

    const $hotelButton = $("#hotel-button");
    $hotelButton.click(() => {
      const select = $("#hotel-select").val();
      const $selectedOption = $(`#hotel-${select}`);
      const hotelName = $($selectedOption[0]).html();
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
  };

  getAllAttractions();
});
