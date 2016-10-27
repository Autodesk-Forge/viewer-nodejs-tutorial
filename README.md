# Forge Viewer - NodeJS Tutorial
Simple Getting Started with Forge Viewer API

## Description
This web application implements a basic Node.js server and JavaScript/HTML5 client. It does not demonstrate how to upload a model to the Autodesk server for translation. See instructions below on how to prepare a model to be consumed in this sample.

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


## Setup/Usage Instructions
 
* Apply for your own credentials (API keys) from [developer.autodesk.com](http://developer.autodesk.com)
* From the sample root folder, rename or copy the ./credentials_.js file into ./credentials.js <br />
  * Windows <br />
    ```
    copy credentials_.js credentials.js 
	```
  * OSX/Linux <br />
    ```
    cp credentials_.js credentials.js  
	```
* Replace the placeholders with your own keys in credentials.js, line #25 and #26 <br />
  ```
  client_id: process.env.CONSUMERKEY || '<replace with your consumer key>',
  
  client_secret: process.env.CONSUMERSECRET || '<replace with your consumer secret>',
  ```
* Upload one of your models to your account and get its URN using the following website:
  - [Model Uploader](https://models.autodesk.io/) 
  
* Copy the URN which was generated in the previous step in file /www/index.js at line #19 <br />Note: the URN needs to be base64 encoded as mentioned [here](https://developer.autodesk.com/en/docs/model-derivative/v2/tutorials/prepare-file-for-viewer/) under "Step 1: Convert the source URN into a Base64-Encoded URN" but the previous site gives it back encoded already.<br />
  ```
  var defaultUrn = '<replace with your encoded urn>';
  ```
* Add the following to your www/js/index.js file

```js


var defaultUrn = '<Replace with your ENCODED Base64 URN>';
var tokenurl = window.location.protocol + '//' + window.location.host + '/api/token';

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

* Run the server from the Node.js console, by running the following command: <br />
  ```
  node server.js 
  ```

* Connect to you local server using a WebGL-compatible browser: [http://localhost:3000/](http://localhost:3000/)

## License

That samples are licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT). Please see the [LICENSE](LICENSE) file for full details.


## Written by 

Written by [Jaime Rosales](https://twitter.com/afrojme), Autodesk Forge Developer Partner.


