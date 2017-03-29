
# Setting up your Node JS Server with Express
<a name="Server"></a>

Step 1 - Server.js
<a name="Step1"></a>

Uncomment the following from your Server.js file.

```js
var favicon = require('serve-favicon');
var oauth = require('./routes/oauth');
var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use('/', express.static(__dirname + '/www'));
app.use(favicon(__dirname + '/www/images/favicon.ico'));

// /////////////////////////////////////////////////////////////////////////////////
// //
// // Use this route for proxying access token requests
// //
// /////////////////////////////////////////////////////////////////////////////////

app.use('/oauth', oauth);
var server = app.listen(app.get('port'), function() {
    console.log('Server listening on port ' + server.address().port);
});
```

Step 2 - oauth.js route
<a name="Step2"></a>


In your oauth.js file under routes folder, uncomment the below code in order to obtain your authorization token. 
Make sure you have created your credentials.js file and have added your API Keys.

```js
/////////////////////////////////////////////////////////////////////////////////
//
// Obtaining our Token 
//
/////////////////////////////////////////////////////////////////////////////////

var express = require('express');
var request = require('request');
var router = express.Router();

var credentials = (require ('fs').existsSync (__dirname + '/../credentials.js') ?
    require (__dirname + '/../credentials')
    : (console.log ('No credentials.js file present, assuming using FORGE_CLIENT_ID & FORGE_CLIENT_SECRET system variables.'), 
    require (__dirname + '/../credentials_'))) ;

router.get ('/token', function (req, res) {
    request.post (
        credentials.Authentication,
        { form: credentials.credentials },
        function (error, response, body) {
            if ( !error && response.statusCode == 200 )
                res.send (body) ;
        }) ;
}) ;

module.exports = router;

```

