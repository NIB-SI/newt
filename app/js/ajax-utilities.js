var libxmljs = require('libxmljs');
var fs = require('fs');
var request = require('request');

/*
	functions in this file all have to take the same arguments:
	 - req: the ajax request object, contains parameters sent threw ajax call in req.query 
	 - res: the response object that MUST be called through res.send to send the result back
	The only cases where res.send doesn't need to be used is in case of errors.
	Then it is possible to throw the error and let it be handled by the server.js call.
*/

exports.validateSBGNML = function (req, res) {
	var sbgnml = req.query.sbgnml;

	var xsdString;
	try {
		xsdString = fs.readFileSync('app/resources/libsbgn-0.3.xsd', {encoding: 'utf8'});// function (err, data) {
	}
	catch (err) {
		throw new Error("Failed to read xsd file " + err);
	}

	var xsdDoc;
	try {
		xsdDoc = libxmljs.parseXml(xsdString);
	}
	catch (err) {
		throw new Error("libxmljs failed to parse xsd " + err);
	}

	var xmlDoc;
	try {
		xmlDoc = libxmljs.parseXml(sbgnml);
	}
	catch (err) {
		throw new Error("libxmljs failed to parse xml " + err);
	}

	if (!xmlDoc.validate(xsdDoc)) {
		var errors = xmlDoc.validationErrors;
		var errorList = [];
		for(var i=0; i < errors.length; i++) {
			 // I can't understand the structure of this object. It's a mix of object with string in the middle....
			var error = errors[i];
			var message = error.toString(); // get the string message part
			var newErrorObj = {}; // get the object properties
			newErrorObj.message = message;
			for(var key in error) {
				newErrorObj[key] = error[key];
			}
			errorList.push(newErrorObj);
		}
		res.send(errorList);
	}
	else {
		res.send("validate OK");
	}
};

/**
 * Simple get request to other page. Used to test the validity of annotations links.
 * Simply pass the response back.
 * This cannot be done on browser side due to CORS/same-origin policies forbiding requests
 * by the application to other domains than the application's domain.
 */
exports.testURL = function (req, res) {
	var url = req.query.url;
	request.get(url, {timeout: 5000}, function (error, response, body) {
		res.send({error: error, response: response});
	});
};
