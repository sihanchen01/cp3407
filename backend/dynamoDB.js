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
	const options = {
		uri: searchResult.ImageUrl,
		encoding: null,
	};

	const s3ImageKey = searchResult.UserId + searchResult.CreationDate;

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
		Expires: 3600,
	});

	const params = {
		TableName: TABLE_NAME,
		Item: { ...searchResult, ImageUrl: s3ImageUrl },
	};
	return await dynamoClient.put(params).promise();
};

// addOrUpdateSearchResult({ ...exampleData, StoryLike: true, ImageLike: true });

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
	deleteSearchResult,
};
