var express = require('express');
var uuid = require('uuid/v1');
var bodyParser = require('body-parser');
const lambdaAudio = require('lambda-audio')

var app = express();
app.use(bodyParser.json());

app.post('/fileConverion', function(req, res) {
    'use strict';
    console.log(req.body);
    console.log(req.body.filename);
    console.log(req.body.sampleRate);
    var outputFile = uuid();
    lambdaAudio.sox([req.body.filename,outputFile+".wav","rate",req.body.sampleRate])
  	.then(response => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ resultName: outputFile+".wav" }, null, 3)); 
  	})
  	.catch(errorResponse => {
    console.log('Error from the sox command:', errorResponse)
  	})
});

app.post('/fileInfo', function(req, res) {
    'use strict';
    //console.log(req.body);
    console.log(req.body.filename);

    lambdaAudio.soxi('./'+req.body.filename)
  	.then(response => {
  		console.log(response);
    	res.setHeader('Content-Type', 'application/json');
    	res.send(JSON.stringify({ response: response }, null, 3)); 
  	})
  	.catch(errorResponse => {
    console.log('Error from the soxi command:', errorResponse)
  	})
    // res.send(200);
});

app.listen(3000);