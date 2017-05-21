var airbnb = require('airapi')

airbnb.search({
    location: "Seattle, WA",
    checkin: "05/05/2017",
    checkout: "05/06/2017"
}).then(function(searchResults) {
    console.log(searchResults["results_json"]["search_results"][0]);
});
