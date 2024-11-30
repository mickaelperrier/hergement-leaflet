var map = L.map('map');
var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib = 'Map data © OpenStreetMap contributors';
var osm = new L.TileLayer(osmUrl, { attribution: osmAttrib }).addTo(map);
map.setView([45.733, 4.834], 17);

var velovIcon = L.icon({
  iconUrl: 'img/velov.png',
  iconSize: [36, 36],
  iconAnchor: [19, 36]
});

async function charger_geojson(url) {
  let response = await fetch(url)
  let notre_geojson = await response.json()
  var stations_velov_layer = L.geoJSON(notre_geojson, {
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, { icon: velovIcon });
    },
    onEachFeature: function (feature, layer) {
      layer.bindTooltip(feature.properties.adresse1)
      console.log(feature.properties.adresse1)
    }
  }).addTo(map);
  map.fitBounds(stations_velov_layer.getBounds())
}

charger_geojson('data/stations_velov_wgs84.geojson')




