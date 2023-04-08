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

// Request All by only given partition key
const getAllByUserId = async (userId) => {
	const params = {
		TableName: TABLE_NAME,
	};
	const dataAll = await dynamoClient.scan(params).promise();
	const result = dataAll.Items.filter((d) => d.UserId == userId);
	return result;
};

// getAll();

// Request :id, use both partition key and sorting key to get item
const getSearchResultsByKeys = async (userId, creationDate) => {
	const params = {
		TableName: TABLE_NAME,
		Key: {
			UserId: userId,
			CreationDate: creationDate,
		},
	};
	return await dynamoClient.get(params).promise();
};

// getSearchResultsByUserId("user123");

// Upadte, Create
const addOrUpdateSearchResult = async (searchResult) => {
	const params = {
		TableName: TABLE_NAME,
		Item: searchResult,
	};
	return await dynamoClient.put(params).promise();
};

// Download image and store to S3
const storeImageToS3 = (searchResult) => {
	const options = {
		uri: searchResult.ImageUrl,
		encoding: null,
	};

	const s3ImageKey = `${searchResult.UserId} / ${searchResult.SearchQuery} / ${searchResult.CreationDate}`;

	request(options, function (err, res, body) {
		if (err || res.statusCode !== 200) {
			console.log("failed to get image");
			console.log(err);
		} else {
			s3.putObject(
				{
					Body: body,
					Key: s3ImageKey,
					Bucket: "cp3407",
					ContentType: "image/jpg",
				},
				function (err, data) {
					if (err) {
						console.log("Error downloading image to S3");
					} else {
						console.log("Image successfully add to s3");
					}
				}
			);
		}
	});

	const s3ImageUrl = s3.getSignedUrl("getObject", {
		Bucket: "cp3407",
		Key: s3ImageKey,
	});

	return s3ImageUrl;
};

// Delete
const deleteSearchResult = async (userId, creationDate) => {
	const params = {
		TableName: TABLE_NAME,
		Key: {
			UserId: userId,
			CreationDate: creationDate,
		},
	};
	return await dynamoClient.delete(params).promise();
};

module.exports = {
	dynamoClient,
	getAllByUserId,
	getSearchResultsByKeys,
	addOrUpdateSearchResult,
	storeImageToS3,
	deleteSearchResult,
};
