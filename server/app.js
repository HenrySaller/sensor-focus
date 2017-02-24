const compression = require('compression');
const express = require('express');
const path = require('path');
const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(compression());

app.use(express.static(path.resolve(__dirname, '..', 'bower_components')));
app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'client/html/index.html'));
});

app.get('/data', function(req, res) {
  const filePath = path.resolve(
    __dirname,
    'data/' + path.basename(req.query.page) + '.json'
  );

  res.sendFile(filePath, function(err) {
    if (err) throw err;
  });
});

app.get('/tpl', function(req, res) {
  const filePath = path.resolve(
    __dirname,
    '..',
    'client/html/tpl/' + path.basename(req.query.tpl) + '.html'
  );

  res.sendFile(filePath, function(err) {
    if (err) throw err;
  });
});

app.get('/:page', function(req, res) {
  res.sendFile(path.resolve(
    __dirname,
    '..',
    'client/html/' + path.basename(req.params.page) + '.html'
  ));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
