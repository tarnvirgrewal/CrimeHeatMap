var map;
var heatmap;
document.getElementById('testButton').addEventListener('click',loadHeatmap)
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: new google.maps.LatLng(-37.8136, 144.9631),
    mapTypeId: 'roadmap'
  });

  
}

// Loop through the results array and store the positional value in the latLng array then
// displaying it on the heatmap

window.eqfeed_callback = function(results) {
  var latLng = [];
  for (var i = 0; i < results.features.length; i++) {
    var coords = results.features[i].geometry.coordinates;
    var totalCrimeInPostCode = results.features[i].properties.TotalCrime;
    // USE WEIGHTS INSTEAD OF LOOP MULTIPLE TIMES OVER THE SAME POINT 
     latLng.push({location: new google.maps.LatLng(coords[1],coords[0]),weight:totalCrimeInPostCode}); 
     
     
  }
   heatmap = new google.maps.visualization.HeatmapLayer({
    data: latLng,
    map: map
    
  });
  heatmap.set('radius', heatmap.get('radius') ? null : 50)
}


// Extra map Functionality
function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
} 

function changeGradient() {
  
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ];
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
  heatmap.set('radius', heatmap.get('radius') ? null : 50);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.8);
} 

// Search bar code
function loadHeatmap(){

  
// Create a <script> tag and set the USGS URL as the source.
var script = document.createElement('script');

// The source file location
//Should probably learn how to call file rather than hardcoding this 
var path = document.getElementById('search');
script.src = path.value+ '.geojson';
document.getElementsByTagName('head')[0].appendChild(script);
}