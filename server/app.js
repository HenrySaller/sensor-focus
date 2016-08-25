var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
app.use(express.static(path.resolve(__dirname, '..', 'bower_components')));
app.use(express.static(path.resolve(__dirname, '..', 'client/html')));
app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'client/html/index.html'));
});

app.get('/data', function(req,res) {
  var filePath = path.resolve(__dirname + '/data/' + req.query.page + '.json');
  res.sendFile(filePath, function (err) {
    if (err) throw err;
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
