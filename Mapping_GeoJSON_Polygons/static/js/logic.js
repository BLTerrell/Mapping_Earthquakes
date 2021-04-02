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
    "Satellite Streets": satelliteStreets
};

// Create the map onject with a center and zoom level
let map = L.map("mapid", {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [satelliteStreets]
});

L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto neighborhoods GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/BLTerrell/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json"

// styling for polygons
myStyle = {
    color: "blue",
    fillColor: "yellow",
    weight: 1
};

// Grabbing our GeoJSON data
d3.json(torontoHoods).then(function (data) {
    console.log(data);
    // Create a geoJSON layer with the retrieved data
    L.geoJSON(data, {
        style: myStyle,
        onEachFeature: function (feature, layer) {
            layer.bindPopup("<h4> Neighborhood: " + layer.feature.properties.AREA_NAME + "</h4>");
        }
    }).addTo(map);
})

// Accessing the Toronto airline routes GeoJSON URL
// let torontoData = "https://raw.githubusercontent.com/BLTerrell/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/torontoRoutes.json";

// myStyle = {
//     color: "#ffffa1",
//     weight: 2
// }

// //Grabbing our GeoJSON data
// d3.json(torontoData).then(function (data) {
//     console.log(data);
//     // Creating a GeoJSON layer with the retrieved data
//     L.geoJSON(data, {
//         // color: '#ffffa1',
//         //weight: 2,
//         style: myStyle,
//         onEachFeature: function (feature, layer) {
//             console.log(layer);
//             layer.bindPopup("<h3> Airport code: " + layer.feature.properties.airline + "</h3> <hr> <h4> Airport name: " + layer.feature.properties.dst + "</h4>");
//         }
//     }).addTo(map);
// });


// Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);


// Accessing the airport GeoJSON URL
// let airportData = "https://raw.githubusercontent.com/BLTerrell/Mapping_Earthquakes/Mapping_GeoJSON_Points/majorAirports.json";

// // Grabbing our GeoJSON data
// d3.json(airportData).then(function (data) {
//     console.log(data);
//     // Creating a GeoJSON layer with the retrieved data
//     L.geoJSON(data, {
//         onEachFeature: function (feature, layer) {
//             console.log(layer);
//             layer.bindPopup("<h3> Airport code: " + layer.feature.properties.faa + "</h3> <hr> <h4> Airport name: " + layer.feature.properties.name + "</h4>");
//         }
//     }).addTo(map);
// });
