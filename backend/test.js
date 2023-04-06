const {
	getAllByUserId,
	getSearchResultsByKeys,
	addOrUpdateSearchResult,
	deleteSearchResult,
} = require("./dynamoDB");

const userId = "sihanchen01@outlook.com";
const ts = "Thu Apr/6th/2023 4:35:03pm";

// const result = getSearchResultsByUserId(userId, ts);

getAllByUserId("user123");
