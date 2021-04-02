// Add console.log to check to see if our code is working
console.log("working");


// We create the tile layer that will be the background of our map.
// navigation-guidance-night-v2
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
};

// Create the map onject with a center and zoom level
let map = L.map("mapid", {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

L.control.layers(baseMaps).addTo(map);

// Retrieve the earthquake GeoJSON data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {
    // Create a geoJSON layer with the retrieved data
    L.geoJSON(data).addTo(map);
})




// // Accessing the Toronto neighborhoods GeoJSON URL
// let torontoHoods = "https://raw.githubusercontent.com/BLTerrell/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json"

// // styling for polygons
// myStyle = {
//     color: "blue",
//     fillColor: "yellow",
//     weight: 1
// };

// // Grabbing our GeoJSON data
// d3.json(torontoHoods).then(function (data) {
//     console.log(data);
//     // Create a geoJSON layer with the retrieved data
//     L.geoJSON(data, {
//         style: myStyle,
//         onEachFeature: function (feature, layer) {
//             layer.bindPopup("<h4> Neighborhood: " + layer.feature.properties.AREA_NAME + "</h4>");
//         }
//     }).addTo(map);
// })
