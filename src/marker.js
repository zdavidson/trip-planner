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
