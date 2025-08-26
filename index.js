// index.js
// A timestamp microservice with a unique design.

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Solution for the Timestamp Microservice challenge
app.get('/api/:date?', function (req, res) {
  let dateString = req.params.date;
  let date;

  // Case 1: No date parameter provided
  if (!dateString) {
    date = new Date();
  } else {
    // Case 2: Date string is a Unix timestamp (a number)
    // Check if the string contains only digits.
    if (!isNaN(dateString) && !isNaN(parseFloat(dateString))) {
      date = new Date(parseInt(dateString));
    } else {
      // Case 3: Date string is a date format (e.g., "2015-12-25")
      date = new Date(dateString);
    }
  }

  // Check if the date is valid
  // The getTime() method returns NaN for an "Invalid Date" object.
  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    // Return the JSON object with Unix and UTC time.
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
