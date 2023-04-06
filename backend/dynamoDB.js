require("dotenv").config();
const AWS = require("aws-sdk");

// Setup AWS DynamoDB
AWS.config.update({
	region: process.env.AWS_DEFAULT_REGION,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "searchResult";

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

const exampleData = {
	UserId: "sihanchen@gmail.com",
	CreationDate: 123123123,
	Story: "ipsum lorem ahahhahahah",
	ImageUrl: "www.google.com",
};

// Upadte, Create
const addOrUpdateSearchResult = async (searchResult) => {
	const params = {
		TableName: TABLE_NAME,
		Item: searchResult,
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
