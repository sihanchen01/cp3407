require("dotenv").config();
const request = require("request-promise");
const AWS = require("aws-sdk");

// Setup AWS DynamoDB
AWS.config.update({
	region: process.env.AWS_DEFAULT_REGION,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "searchResult";

const s3 = new AWS.S3();

const url = s3.getSignedUrl("getObject", {
	Bucket: "cp3407",
	Key: "lightbulb_150x150.jpg",
	Expires: 600,
});

console.log(url);
