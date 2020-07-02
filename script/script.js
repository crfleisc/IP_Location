//https://cors-anywhere.herokuapp.com
var ipStackUrl = 'http://api.ipstack.com/';
var ipStackKey = 'd9b790869ee57260fde700188b76ca02';
var jsonUrl = 'https://jsonip.com/';
var startCoordinates = [-114.0857, 51.0380];
var coordinates;
var zoom = 18;
var map;
var ip, continent, country, flag, region, city, zip;

var ip = GetUserIP();
var url = ipStackUrl + ip + '?access_key=' + ipStackKey; 

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
            map = new ol.Map({
            target: document.getElementById('map'),
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat(startCoordinates),
                zoom: zoom
            })
        });

    }
}

function GetUserIP(){
    console.log('GetUserIP here');
    var ret_ip;
    $.ajaxSetup({async: false});
    $.get(jsonUrl, function(r){ 
        ret_ip = r.ip; 
    });
    return ret_ip;
}

$.ajax({
    type: "GET",
    url: url, 
    dataType: "html",
     success: function(result){
        loadMap(result);
        console.log('success in ipstackurl' + result);
    },
    error: function(xhr, status, error){
        console.log("ERROR " + xhr);
    }
});

function loadMap(geoInfo){
    var result;
    result = JSON.parse(geoInfo);
    
    coordinates = [result.longitude, result.latitude];
    ip = result.ip;
    continent = result.continent_name;
    country = result.country_name;
    flag = result.location.country_flag;
    region = result.region_name;
    city = result.city;
    zip = result.zip;
}

function changeview(){
    map.getView().setCenter(ol.proj.transform(coordinates, 'EPSG:4326', 'EPSG:3857'));
    map.getView().setZoom(zoom);
    document.getElementById('flag').src = flag;
    document.getElementById('ip').innerHTML += ip;
    document.getElementById('continent').innerHTML += continent;
    document.getElementById('country').innerHTML += country;
    document.getElementById('region').innerHTML += region;
    document.getElementById('city').innerHTML += city;
    document.getElementById('zip').innerHTML += zip;
    console.log('change view');
}