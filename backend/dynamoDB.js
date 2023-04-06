require("dotenv").config();
const AWS = require("aws-sdk");

// Setup AWS DynamoDB
AWS.config.update({
	region: process.env.AWS_DEFAULT_REGION,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "search_result";

// // Request All
// const getAll = async (userId) => {
// 	const params = {
// 		TableName: TABLE_NAME,
// 	};
// 	const result = await dynamoClient.scan(params).promise();
// 	console.log(result);
// 	return result;
// };

// getAll();

// Request :id
const getSearchResultsByUserId = async (userId, createionDate) => {
	const params = {
		TableName: TABLE_NAME,
		Key: {
			UserId: userId,
			CreationDate: 1680748309.7946088,
		},
	};
	const result = await dynamoClient.get(params).promise();
	console.log(result);
	return result;
};

getSearchResultsByUserId("user123");

// Upadte, Create
const addOrUpdateSearchResult = async (searchResult) => {
	const params = {
		TableName: TABLE_NAME,
		Item: searchResult,
	};

	return await dynamoClient.put(params).promise();
};

// Delete
const deleteSearchResult = async (userId) => {
	const params = {
		TableName: TABLE_NAME,
		Key: {
			UserId: userId,
		},
	};
	return await dynamoClient.delete(params).promise();
};

module.exports = {
	dynamoClient,
	getSearchResultsByUserId,
	addOrUpdateSearchResult,
	deleteSearchResult,
};
