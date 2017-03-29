# Viewer - NodeJS - Tutorial


[![Node.js](https://img.shields.io/badge/Node.js-4.4.0-blue.svg)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-3.10.7-green.svg)](https://www.npmjs.com/)
![Platforms](https://img.shields.io/badge/platform-windows%20%7C%20osx%20%7C%20linux-lightgray.svg)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://opensource.org/licenses/MIT)

[![oAuth2](https://img.shields.io/badge/oAuth2-v1-green.svg)](http://developer.autodesk.com/)
[![Viewer](https://img.shields.io/badge/Viewer-v2-green.svg)](http://developer.autodesk.com/)


## Description
This web application implements a basic Node.js server and JavaScript/HTML5 client. It does not demonstrate how to upload a model to the Autodesk server for translation. See instructions below on how to prepare a model to be consumed in this sample.

This sample show a simple integration of the [Viewer](https://developer.autodesk.com/en/docs/viewer/v2/overview/). The front-end will look like:
  
![](www/images/indexpage.png)

## Dependencies
Install Node.js on your machine and clone this repo. Download the project dependencies using npm before launching the app by running 
the following command in the project root directory:

```
npm install
```
This will install the following node.js modules in the project:

- express
- request
- serve-favicon

As said, this sample does not include the workflow of uploading models to the server.
It depends on other workflow samples to upload models and retrieve the model URNs, as explained in the Setup/Usage Instructions.


## Model Derivative Uploader
 
Upload one of your models to your account and get its URN using the following project:

  - [Model Derivative Uploader](https://github.com/jaimerosales/modelderivative-nodejs-tutorial) 

The URN that you will obtain needs to be added to the documentId variable in the following code at line 41, make sure you don't delete the urn word of the string. 

#### Uncomment the following to your www/js/index.js file

```js

/////////////////////////////////////////////////////////////////////////////////
//
// Use this call to get back an object json of your token
//
/////////////////////////////////////////////////////////////////////////////////

var tokenurl = window.location.protocol + '//' + window.location.host + '/api/token';
function tokenAjax() {
      return $.ajax({
          url:tokenurl,
          dataType: 'json'
      });
}

/////////////////////////////////////////////////////////////////////////////////
//
// Initialize function to the Viewer inside of Async Promise
//
/////////////////////////////////////////////////////////////////////////////////

var viewer;
var options = {};
var documentId = 'urn:<YOUR_URN_ID>';
var promise = tokenAjax();

promise.success(function (data) {
 options = {
      env: 'AutodeskProduction',
      accessToken: data.access_token
    };
  Autodesk.Viewing.Initializer(options, function onInitialized(){
      Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
  }); 
})

/**
* Autodesk.Viewing.Document.load() success callback.
* Proceeds with model initialization.
*/
 
function onDocumentLoadSuccess(doc) {

 // A document contains references to 3D and 2D viewables.
  var viewables = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {'type':'geometry'}, true);
  if (viewables.length === 0) {
      console.error('Document contains no viewables.');
      return;
  }

  // Choose any of the avialble viewables
  var initialViewable = viewables[0];
  var svfUrl = doc.getViewablePath(initialViewable);
  var modelOptions = {
      sharedPropertyDbPath: doc.getPropertyDbPath()
  };

  var viewerDiv = document.getElementById('viewerDiv');
  
  ///////////////USE ONLY ONE OPTION AT A TIME/////////////////////////
  /////////////////////// Headless Viewer ///////////////////////////// 
  viewer = new Autodesk.Viewing.Viewer3D(viewerDiv);
  
  //////////////////Viewer with Autodesk Toolbar///////////////////////
  // viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv);
  //////////////////////////////////////////////////////////////////////
  viewer.start(svfUrl, modelOptions, onLoadModelSuccess, onLoadModelError);
}

/**
* Autodesk.Viewing.Document.load() failuire callback.
*/
function onDocumentLoadFailure(viewerErrorCode) {
  console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

/**
* viewer.loadModel() success callback.
* Invoked after the model's SVF has been initially loaded.
* It may trigger before any geometry has been downloaded and displayed on-screen.
*/
function onLoadModelSuccess(model) {
  console.log('onLoadModelSuccess()!');
  console.log('Validate model loaded: ' + (viewer.model === model));
  console.log(model);
}

/**
* viewer.loadModel() failure callback.
* Invoked when there's an error fetching the SVF file.
*/
function onLoadModelError(viewerErrorCode) {
  console.error('onLoadModelError() - errorCode:' + viewerErrorCode);
}

```

## Now time to setup your server
We will be using Express for our server

* NodeJS [Server](SERVER.md#Server) 
  - [Step 1](SERVER.md#Step1)
  - [Step 2](SERVER.md#Step2)

### Run locally

Install [NodeJS](https://nodejs.org).

Clone this project or download it. It's recommended to install [GitHub desktop](https://desktop.github.com/). To clone it via command line, use the following (<b>Terminal</b> on MacOSX/Linux, <b>Git Shell</b> on Windows):

    git clone https://github.com/autodesk-forge/nodejs-forge-viewer-tutorial

Apply for your own credentials (API keys) from [developer.autodesk.com](http://developer.autodesk.com)

To run it, install the required packages, set the enviroment variables with your client ID & secret and finally start it. Via command line, navigate to the folder where this repository was cloned and use the following:

Mac OSX/Linux (Terminal)

    npm install
    export FORGE_CLIENT_ID=<<YOUR CLIENT ID FROM FORGE DEVELOPER PORTAL>>
    export FORGE_CLIENT_SECRET=<<YOUR FORGE CLIENT SECRET>>
    npm start

Windows (use <b>Node.js command line</b> from Start menu)

    npm install
    set FORGE_CLIENT_ID=<<YOUR CLIENT ID FROM FORGE DEVELOPER PORTAL>>
    set FORGE_CLIENT_SECRET=<<YOUR FORGE CLIENT SECRET>>
    npm start

Open the browser: [http://localhost:3000](http://localhost:3000).


### Deploy on Heroku

To deploy this project to Heroku, be sure to set your environment variables in the dashboard:

- `FORGE_CLIENT_ID`
- `FORGE_CLIENT_SECRET`

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Watch [this video](https://www.youtube.com/watch?v=Oqa9O20Gj0c) on how deploy this sample to Heroku.


## Viewer - Extensions (Extra Step)

If you are done with the display of your translated model. You can start integrating Viewer interaction with custom JS Extensions. 

You can find more extensions to use with the viewer [here](https://github.com/Autodesk-Forge/library-javascript-viewer-extensions)

In your www/js/index.js file, You will find the following simple extensions. Make sure you uncomment the following functions.

``` js

/////////////////////////////////////////////////////////////////////////////////
//
// Load Viewer Background Color Extension
//
/////////////////////////////////////////////////////////////////////////////////

  // function changeBackground (){
  //        viewer.setBackgroundColor(0, 59, 111, 255,255, 255);
  // }

/////////////////////////////////////////////////////////////////////////////////
//
// Unload Viewer Background Color Extension
//
/////////////////////////////////////////////////////////////////////////////////

  // function resetBackground (){     
  //        viewer.setBackgroundColor(169,169,169, 255,255, 255);
  // }

/////////////////////////////////////////////////////////////////////////////////
//
// Load Viewer Markup3D Extension
//
/////////////////////////////////////////////////////////////////////////////////
// 3D Markup extension to display values of the selected objects in the model. 

  // function loadMarkup3D (){
  //        viewer.loadExtension('Viewing.Extension.Markup3D');
  // }

/////////////////////////////////////////////////////////////////////////////////
//
// Load Viewer Transform Extension
//
/////////////////////////////////////////////////////////////////////////////////
// Transformation is allowed with this extension to move object selected in the XYZ
// position or rotation in XYZ as well.

  // function loadTransform (){
  //        viewer.loadExtension('Viewing.Extension.Transform');
  // }

/////////////////////////////////////////////////////////////////////////////////
//
// Load Viewer Control Selector Extension
//
/////////////////////////////////////////////////////////////////////////////////
// This extension allows you to remove certain extensions from the original toolbar 
// provided to you.

  // function loadControlSelector(){
  //        viewer.loadExtension('_Viewing.Extension.ControlSelector');
  // }



```

Also in your www/index.html before the script for the viewer index.js file, make sure you have the following files referenced.

``` html	 
	<!-- The Viewer Extensions -->
    <!-- <script src="/extensions/Viewing.Extension.Markup3D.min.js"></script>
    <script src="/extensions/Viewing.Extension.Transform.min.js"></script>
    <script src="/extensions/_Viewing.Extension.ControlSelector.min.js"></script> -->

    <!-- The Viewer JS -->
    <script src="/js/index.js"></script>


```

Inside of the Div Container for your viewer, you will find the following buttons added. Make sure you uncomment the Extension button together with it's div that contains.

``` html
   <div class="container">
        <!-- This is where your viewer should attach -->
        <div class="center-block" id="viewerDiv"></div>
        
        <!-- Extension Buttons -->
        <!-- <div class="row"> 
             
            <div class="myButton" id="background" onclick="changeBackground()">Change Background</div> 
            <div class="myButton" id="background" onclick="resetBackground()">Reset Background</div> 
            <div class="myButton" id="background" onclick="loadMarkup3D()">Markup3D</div>
            <div class="myButton" id="background" onclick="loadTransform()">Transform</div>
            <div class="myButton" id="background" onclick="loadControlSelector()">Control Selector</div>
        </div>  -->
        
    </div><!-- /container -->
```

And last, to have some styling in our new buttons, make sure you uncomment the following code which you can find in your www/css/main.css file.

``` css

h4 {
  color: white;
}

/*.myButton {
      background-color: white;
      color: #4CAF50;
      border: 2px solid #4CAF50;
      border-radius: 8px;
      display:inline-block;
      cursor:pointer;
      font-family:Verdana;
      font-size:17px;
      padding:16px 31px;
      text-decoration:none;
      margin-top: 1em;
      -webkit-transition-duration: 0.4s; 
      transition-duration: 0.4s;
}

.myButton:hover {
      background-color: #4CAF50; 
      color: white;
}

.myButton:active {
      position:relative;
      top:1px;
}*/


```

## License

That samples are licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT).


## Written by

Jaime Rosales D. <br /> 
[![Twitter Follow](https://img.shields.io/twitter/follow/afrojme.svg?style=social&label=Follow @Afrojme)](https://twitter.com/afrojme) <br />
Forge Partner Development <br />
<a href="http://developer.autodesk.com/">Forge Developer Portal</a> <br />

