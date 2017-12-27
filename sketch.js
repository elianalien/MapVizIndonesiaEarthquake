
var staticMapImage;

var coordinateLongitude = 113.9213;
var coordinateLatitude = 0.7893;
var zoomLvl = 3.8; // 3.8
var bearingLvl = 0;
var pithcDeg = 0;
var mapWidth = 1280; // max res: 1280
var mapHeight = 640; // max res: 1280
var mapTiles = mapHeight/2;
var mapToken = 'pk.eyJ1IjoiZWxpYW5hbGllbiIsImEiOiJjamJvbXNnNHkzdWM2MzRxd2pncGlmZG4zIn0.t-fmnQUcXnuAcxFTSKcOeQ';
var earthquakeInd;

/**
STYLE MAP
 mapbox://styles/mapbox/streets-v10
 mapbox://styles/mapbox/outdoors-v10
 mapbox://styles/mapbox/light-v9
 mapbox://styles/mapbox/dark-v9
 mapbox://styles/mapbox/satellite-v9
 mapbox://styles/mapbox/satellite-streets-v10
 mapbox://styles/mapbox/navigation-preview-day-v2
 mapbox://styles/mapbox/navigation-preview-night-v2
 mapbox://styles/mapbox/navigation-guidance-day-v2
 mapbox://styles/mapbox/navigation-guidance-night-v2
 */
var streetMode = 'streets-v10';
var darkMode = 'dark-v9';
var outdoors = 'outdoors-v10'

// center map
var centerLon = 113.9213;
var centerLat = 0.7893;

// Bandung: 6.9175° S, 107.6191° E
// Kediri: 7.8480° S, 112.0178° E
// Indonesia: 0.7893° S, 113.9213° E
// South: -1 * North degree
// West : -1 * East degree
var lat = -7.8480;
var lon = 112.0178;

function setup() {
  // put setup code here
  createCanvas(mapWidth,mapHeight);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(staticMapImage,0,0);

  for (var i = 1; i < earthquakeInd.length; i++){
    var data = earthquakeInd[i].split("\t");
    console.log(data);

    var dataLat = data[2];
    var dataLon = data[4];
    var dataDepth = data[5];
    var dataMag = data[6];

    if (data.length > 18) {
      dataDepth = data[6];
      dataMag = data[7];
    }

    var cX = xMerc(centerLon);
    var cY = yMerc(centerLat);

    var x = xMerc(dataLon) - cX;
    var y = yMerc(dataLat) - cY;

    var mapSize = map(dataMag, 1, 9.5, 0, 50);
    var mapColor = map(dataDepth, 1, 1000, 128, 255);

    noStroke();
    fill(mapColor, 0, 0, 150);
    ellipse(x, y, mapSize, mapSize);
  }
}

function draw() {
  //put drawing code here
  // var xColor = map(mouseX, 0, 400, 0, 255);
  // var yColor = map(mouseY, 0, 400, 0, 255);
  // fill(200, xColor, yColor);
  // ellipse(mouseX, mouseY, 25, 25);
}

function clearCanvas(){
    clear();
}

function preload(){
  staticMapImage = loadImage('https://api.mapbox.com/styles/v1/mapbox/'+
              outdoors+ // <===== map styles over here
              '/static/'+
              String(coordinateLongitude)+','+
              String(coordinateLatitude)+','+
              String(zoomLvl)+','+
              String(bearingLvl)+','+
              String(pithcDeg)+'/'+
              String(mapWidth)+'x'+String(mapHeight)+'?'+
              'access_token='+mapToken);

  earthquakeInd = loadStrings('http://127.0.0.1:8080/gempa.txt');
}

function xMerc(lon){
  lon = radians(lon);
  var a = ((mapTiles/PI) * pow(2, zoomLvl))*(lon + PI);
  return a;
}

function yMerc(lat){
  lat = radians(lat);
  var a = ((mapTiles/PI) * pow(2, zoomLvl))*(PI - log(tan(PI/4+lat/2)));
  return a;
}
