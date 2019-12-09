
document.getElementById("load").innerhtml = '<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAWc6DjHQ6x-QQ7H07Fw7Y5tf3P0uFHmj0&libraries=visualization"></script>'

initMap(markers){
  let heat = [];
  let avg_lat = 0, avg_long = 0;
  markers.forEach((item, index) => {
    avg_lat += item.latitude;
    avg_long += item.longitude;
    heat.push(new google.maps.LatLng(item.latitude, item.longitude))
  })
  avg_lat = avg_lat / markers.length;
  avg_long = avg_long / markers.length;
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: new google.maps.LatLng(avg_lat, avg_long),
    mapTypeId: 'terrain'
  });

  var heatmap = new google.maps.visualization.HeatmapLayer({
  data: heat
});
  heatmap.setMap(map);

}
