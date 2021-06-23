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
