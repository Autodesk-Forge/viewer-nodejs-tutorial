var favicon = require('serve-favicon');
var api = require('./routes/api');
var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use('/', express.static(__dirname + '/www'));
app.use(favicon(__dirname + '/www/images/favicon.ico'));

// Use this route for proxying access token requests
app.use('/api', api);
console.log('server api ', api);

var server = app.listen(app.get('port'), function() {
    console.log('Server listening on port ' + server.address().port);
});