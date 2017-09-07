'use strict';
var AWSXRay = require('aws-xray-sdk-core');
var aws = AWSXRay.captureAWS(require('aws-sdk'));
const s3 = new aws.S3({ apiVersion: '2006-03-01' });

exports.handler = (event, context, callback) => {
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    callback(null, bucket + '/' + key);
};

