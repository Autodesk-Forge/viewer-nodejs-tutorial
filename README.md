# Forge Viewer - NodeJS Tutorial


Getting Started with Forge Viewer API

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


## Model Uploader
 
Upload one of your models to your account and get its URN using the following website:

  - [Model Uploader](https://models.autodesk.io/) 
  
Copy the URN which was generated in the previous step in file /www/index.js at line #19 <br />Note: the URN needs to be base64 encoded as mentioned [here](https://developer.autodesk.com/en/docs/model-derivative/v2/tutorials/prepare-file-for-viewer/) under 
"Step 1: Convert the source URN into a Base64-Encoded URN" but the previous site gives it back encoded already.<br />
  
```
var defaultUrn = '<replace with your encoded urn>';
```
Uncomment the following to your www/js/index.js file

```js

var defaultUrn = '<Replace with your ENCODED Base64 URN>';
var tokenurl = window.location.protocol + '//' + window.location.host + '/api/token';
 
```

```js
/////////////////////////////////////////////////////////////////////////////////
//
// Initialize function to the Viewer
//
/////////////////////////////////////////////////////////////////////////////////

function initialize() {
    var config = {
        environment : 'AutodeskProduction'
    };

    // Instantiate viewer factory
    var viewerFactory = new Autodesk.ADN.Toolkit.Viewer.AdnViewerFactory(
        tokenurl,
        config);

    // Allows different urn to be passed as url parameter
    var paramUrn = Autodesk.Viewing.Private.getParameterByName('urn');
    var urn = (paramUrn !== '' ? paramUrn : defaultUrn);

    viewerFactory.getViewablePath (urn,
        function(pathInfoCollection) {
            var viewerConfig = {
                // viewerType: 'GuiViewer3D'
                 viewerType: 'Viewer3D' // If a viewer without a toolbar is wanted
            };
            viewer = viewerFactory.createViewer(
                $('#viewerDiv')[0],
                viewerConfig);
                console.log('path ', pathInfoCollection.path3d[0].path);
                
            viewer.load(pathInfoCollection.path3d[0].path);
        }, onError);    
};

/////////////////////////////////////////////////////////////////////////////////
//
// I use this call if you want to get back an object json of your token
//
/////////////////////////////////////////////////////////////////////////////////

var tokenAjax = function(handleData) {
      $.ajax({
        url:tokenurl,
        dataType: 'json',  
        success:function(data) {
          handleData(data); 
        }
    });
}

/////////////////////////////////////////////////////////////////////////////////
//
// onError Function
//
/////////////////////////////////////////////////////////////////////////////////

function onError(error) {
    console.log('Error: ' + error);
};

```

##Now time to setup your server

* [Server](SERVER.md#Server)
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

In your www/js/index.js file, You will find the following simple extensions. Make sure you uncomment the following functions.

``` js

/////////////////////////////////////////////////////////////////////////////////
//
// Load Viewer Background Color Extension
//
/////////////////////////////////////////////////////////////////////////////////

  function loadChangeBackground (){
          viewer.setBackgroundColor(255,255, 255, 255,255, 255);
  }

 /////////////////////////////////////////////////////////////////////////////////
//
// Unload Viewer Background Color Extension
//
/////////////////////////////////////////////////////////////////////////////////

  function unloadChangeBackground (){
         viewer.setBackgroundColor(169,169,169, 255,255, 255);
  }

```

Also in your www/index.html, inside of the Div Container for your viewer, you will find the following buttons added. Make sure you uncomment the Extension button html code.

``` html
    <div class="container">
        <!-- This is where your viewer should attach -->
        <div class="center-block" id="viewerDiv"></div>


         <!-- Extension Buttons -->
        
  <!--  <div class="myButton" id="background" onclick="loadChangeBackground()">Load Background</div>
        <div class="myButton" id="background" onclick="unloadChangeBackground()">Unload Background</div> -->
        
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

That samples are licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT). Please see the [LICENSE](LICENSE) file for full details.


## Written by

Jaime Rosales D.<br />
[![Twitter Follow](https://img.shields.io/twitter/follow/afrojme.svg?style=social&label=Follow @Afrojme)](https://twitter.com/afrojme) <br />
Forge Partner Development <br />
<a href="http://developer.autodesk.com/">Forge Developer Portal</a> <br />



