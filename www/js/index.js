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
// Use this call to get back an object json of your token
//
/////////////////////////////////////////////////////////////////////////////////

// var tokenurl = window.location.protocol + '//' + window.location.host + '/api/token';
// function tokenAjax() {
//       return $.ajax({
//           url:tokenurl,
//           dataType: 'json'
//       });
// }

/////////////////////////////////////////////////////////////////////////////////
//
// Initialize function to the Viewer inside of Async Promise
//
/////////////////////////////////////////////////////////////////////////////////

// var viewer;
// var options = {};
// var documentId = 'urn:<YOUR_URN_ID>';
// var promise = tokenAjax();

// promise.success(function (data) {
//  options = {
//       env: 'AutodeskProduction',
//       accessToken: data.access_token
//     };
//   Autodesk.Viewing.Initializer(options, function onInitialized(){
//       Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
//   }); 
// })

/**
* Autodesk.Viewing.Document.load() success callback.
* Proceeds with model initialization.
*/
 
// function onDocumentLoadSuccess(doc) {

//  // A document contains references to 3D and 2D viewables.
//   var viewables = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {'type':'geometry'}, true);
//   if (viewables.length === 0) {
//       console.error('Document contains no viewables.');
//       return;
//   }

//   // Choose any of the avialble viewables
//   var initialViewable = viewables[0];
//   var svfUrl = doc.getViewablePath(initialViewable);
//   var modelOptions = {
//       sharedPropertyDbPath: doc.getPropertyDbPath()
//   };

//   var viewerDiv = document.getElementById('viewerDiv');
  
//   ///////////////USE ONLY ONE OPTION AT A TIME/////////////////////////
//   /////////////////////// Headless Viewer ///////////////////////////// 
//   viewer = new Autodesk.Viewing.Viewer3D(viewerDiv);
  
//   //////////////////Viewer with Autodesk Toolbar///////////////////////
//   // viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv);
//   //////////////////////////////////////////////////////////////////////
//   viewer.start(svfUrl, modelOptions, onLoadModelSuccess, onLoadModelError);
// }

/**
* Autodesk.Viewing.Document.load() failuire callback.
*/
// function onDocumentLoadFailure(viewerErrorCode) {
//   console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
// }

/**
* viewer.loadModel() success callback.
* Invoked after the model's SVF has been initially loaded.
* It may trigger before any geometry has been downloaded and displayed on-screen.
*/
// function onLoadModelSuccess(model) {
//   console.log('onLoadModelSuccess()!');
//   console.log('Validate model loaded: ' + (viewer.model === model));
//   console.log(model);
// }

/**
* viewer.loadModel() failure callback.
* Invoked when there's an error fetching the SVF file.
*/
// function onLoadModelError(viewerErrorCode) {
//   console.error('onLoadModelError() - errorCode:' + viewerErrorCode);
// }


/////////////////////////////////////////////////////////////////////////////////
//
// Load Viewer Background Color Extension
//
/////////////////////////////////////////////////////////////////////////////////

  // function loadChangeBackground (){
  //        viewer.setBackgroundColor(255,255, 255, 255,255, 255);
  // }

 /////////////////////////////////////////////////////////////////////////////////
//
// Unload Viewer Background Color Extension
//
/////////////////////////////////////////////////////////////////////////////////

  // function unloadChangeBackground (){
  //        viewer.setBackgroundColor(169,169,169, 255,255, 255);
  // }