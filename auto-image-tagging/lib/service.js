const AWS = require('aws-sdk')

const awsConfig = {
  accessKeyId: process.env.REKOGNITION_AWS_ID, secretAccessKey: process.env.REKOGNITION_AWS_SECRET, region: process.env.REKOGNITION_AWS_REGION, apiVersion: '2016-06-27'
}

module.exports = new AWS.Rekognition(awsConfig)
