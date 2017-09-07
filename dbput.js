'use strict';

var AWSXRay = require('aws-xray-sdk-core');
var AWS = AWSXRay.captureAWS(require('aws-sdk'));
var dynamodb = new AWS.DynamoDB();

exports.handler = (event, context, callback) => {
    const table = event.table;
    const key = event.key;
    var params = {
        Item: {
            "key": {
                S: key
            }
        },
        TableName: table
    };
    dynamodb.putItem(params, function(err, data) {
        if (err) {
            callback(null, err);
        } else {
            callback(null, 'uploaded');
       }
   });
};

