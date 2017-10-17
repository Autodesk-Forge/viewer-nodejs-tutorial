/////////////////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Jaime Rosales 2016 - Forge Developer Partner Services
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////
//
// Obtaining our Token 
//
/////////////////////////////////////////////////////////////////////////////////
'use strict'; // http://www.w3schools.com/js/js_strict.asp
// token handling in session
var token = require('./token');

// web framework
var express = require('express');
var router = express.Router();

// Forge NPM
var forgeSDK = require('forge-apis');

// Forge config information, such as client ID and secret
var config = require('./config');

// wait for Autodesk callback (oAuth callback)
router.get('/user/token', function (req, res) {

    try {
      var client_id = config.credentials.client_id;
      var client_secret = config.credentials.client_secret;
      var scopes = config.scopePublic;
      
      var req = new forgeSDK.AuthClientTwoLegged(client_id, client_secret, scopes);
      req.authenticate()
          .then(function (credentials) {

            console.log('Token: ' + credentials.access_token);
            res.json({ access_token: credentials.access_token, expires_in: credentials.expires_in });

          })
          .catch(function (error) {
            res.status(500).end(error.developerMessage);
          });
    } catch (err) {
        res.status(500).end(err);
    }
});

module.exports = router;