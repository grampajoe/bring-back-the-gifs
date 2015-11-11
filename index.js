var express = require('express');
var app = express();
var qs = require('querystring');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.post('/', function(request, response) {
  var res = {
    "color": "green",
    "message": "It's going to be sunny tomorrow! (yey)",
    "notify": true,
    "message_format": "text"
  };

  var body = '';

  request.on('data', function (data) {
    body += data;
    // Too much POST data, kill the connection!
    // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
    if (body.length > 1e6)
      request.connection.destroy();
  });

  request.on('end', function () {
    var post = qs.parse(body);
    console.log(post);
    console.log('divider');
    console.log(request.body);
  });

  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(res, null, 3));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
