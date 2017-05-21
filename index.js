var express = require('express');
var app = express();
var airbnb = require('airapi');
var bodyParser = require('body-parser');
var http = require('http');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});


var googleMapsClient = require('@google/maps').createClient({
  key: "AIzaSyAeX9R_mrwUMV6w0OlZuHUk2Pd0f04VDm"
});
/*
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
*/


app.post('/attractions', function (req, res) {
    var types = req.body.types;
    var lat = req.body.lat;
    var long = req.body.long;

    var pathName = '/maps/api/place/nearbysearch/json?location=' + lat + ',' + long + '&radius=5000&types=' + 
                types + '&key=AIzaSyBGsNt88N13IZNoK8h9go6EO8_zQm7X3rQ';
    console.log(pathName);

    var options = { 
    host: 'maps.googleapis.com',
    path: pathName
    }
    callback = function(response) {
        // variable that will save the result
        var result = '';

        // every time you have a new piece of the result
        response.on('data', function(chunk) {
            result += chunk;
        });

        // when you get everything back
        response.on('end', function() {
            console.log(result);
    });
}

http.request(options, callback).end();
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


var server = app.listen(9000, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
});
