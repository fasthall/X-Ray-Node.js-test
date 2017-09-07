'use strict';

var AWSXRay = require('aws-xray-sdk-core');
var aws = AWSXRay.captureAWS(require('aws-sdk'));
const s3 = new aws.S3({ apiVersion: '2006-03-01' });

exports.handler = (event, context, callback) => {
    const bucket = event.bucket;
    const key = event.key;
    const params = {
        Bucket: bucket,
        Key: key,
        Body: 'Hello world!',
    };
    s3.putObject(params, function(err, data) {
        if (err) {
            callback(null, err);
        } else {
            callback(null, 'uploaded');
        }
    });
};

