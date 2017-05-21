var http = require('http');
var express = require('express');
var app = express();
var airbnb = require('airapi');
var bodyParser = require('body-parser');

var googleMapsClient = require('@google/maps').createClient({
  key: "AIzaSyD8qDfEL3_E_h6y0-aLzh3OhK3dIIt_RSM"
});


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Location information
app.post('/location', function (req, res) {
    var loc = req.body.loc;
    var startDate = req.body.start;
    var endDate = req.body.end;

    airbnb.search({
        location: loc,
        checkin: startDate,
        checkout: endDate
    }).then(function(searchResults) {
        var ans = {"answertype": "airbnb", "airbnb": searchResults };
        res.json(ans);
    });
});

app.get('/', function (req, res) {
    res.send("Work");
});

app.post('/attractions', function (req, res) {
    console.log("YO");
    var types = req.body.types;
    var lat = req.body.lat;
    var long = req.body.long;

    googleMapsClient.placesNearby({
      language: 'en',
      location: [-33.865, 151.038],
      radius: 5000,
      minprice: 1,
      maxprice: 4,
      opennow: true,
      type: 'restaurant'
  }, function(err, response) {
      console.log(response);
  });
});


app.post('/geopaths', function (res, req) {
    var googleList = JSON.parse(req.body.types)["results"];
    var numDays = req.body.days;
    var dayDistribution = [];
    var resterauntList = [];

    for(var num = 0; num < numDays; num++) {
        dayDistribution[num] = [];
    }

    for (var i = 0; i < googleList.length; i++) {
        var typeList = googleList["types"];
        for(var j = 0; j < typeList.list; j++) {
            if(typeList[j] == "resteraunt") {
                resterauntList.push(i);
            }
        }
    }

    for(var k = 0; k < resterauntList.length || k < 9; k++) {
        dayDistribution[Math.floor(k%3)].push(dayDistribution[k]);
    }

    for(var m = 0; m < googleList.length; m++){
    }

});



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});


var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
});
