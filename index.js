var express = require('express');
var app = express();
var airbnb = require('airapi');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/location', function (req, res) {
    var loc = req.body.loc;
    var startDate = req.body.start;
    var endDate = req.body.end;
    var airbnbResults;

    airbnb.search({
        location: loc,
        checkin: startDate,
        checkout: endDate
    }).then(function(searchResults) {
        airbnbResults = searchResults;
        var ans = {"answertype": "airbnb", "airbnb": airbnbResults };
        res.json(ans);
    });
});

var server = app.listen(9000, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
});
