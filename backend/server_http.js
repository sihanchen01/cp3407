const express = require("express");
const app = express();
app.use(express.json());

// CORS
const cors = require("cors");
app.use(cors({ origin: "*" }));

// ENV
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// OpenAI
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
	apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Get AWS DynamoDB Hooks
const {
	getAllByUserId,
	getSearchResultsByKeys,
	addOrUpdateSearchResult,
	deleteSearchResult,
} = require("./dynamoDB");

// Moment, date formatting
const moment = require("moment");

// Express API

/* Search result from /image and /story will not be saved into AWS DynamoDB.
Only write to DynamoDB when calling /storywithimage
*/
// Get all search results by given User ID
app.post("/getAllResults", async (req, res) => {
	try {
		const { userEmail } = req.body;
		console.log("fetching all search results for user: " + userEmail);
		const results = await getAllByUserId(userEmail);
		return res.status(200).json({
			success: true,
			results: results,
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			error: err.response
				? err.response.data
				: "Something is wrong with server, contact response team for more information.",
		});
	}
});

// Generate Only Image
app.post("/image", async (req, res) => {
	try {
		const { reqPrompt, userEmail } = req.body;
		console.log("requesting image for: " + reqPrompt);
		console.log("useremail: " + userEmail);
		const response = await openai.createImage({
			prompt: reqPrompt,
			size: "512x512",
		});
		const imageUrl = response.data.data[0].url;
		return res.status(200).json({
			success: true,
			url: imageUrl,
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			error: err.response
				? err.response.data
				: "There is something wrong with server.",
		});
	}
});

// Generate Only Story
app.post("/story", async (req, res) => {
	try {
		const { reqPrompt, userEmail } = req.body;
		console.log("requesting story for: " + reqPrompt);
		console.log("useremail: " + userEmail);
		const textResponse = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					content: "Write a story of " + reqPrompt + "within 250 words",
				},
			],
		});
		return res.status(200).json({
			success: true,
			story: textResponse.data.choices[0].message.content,
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			error: err.response
				? err.response.data
				: "There is something wrong with server.",
		});
	}
});

/* Generate Both Story and Image
This API call will write search result to DB */
app.post("/storywithimage", async (req, res) => {
	try {
		// Get Image
		const { reqPrompt, userEmail } = req.body;
		console.log("requesting story & image for: " + reqPrompt);
		console.log("useremail: " + userEmail);
		const response = await openai.createImage({
			prompt: reqPrompt,
			size: "512x512",
		});
		const imageUrl = response.data.data[0].url;

		// Get Story
		const textResponse = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					content: "Write a story of " + reqPrompt + "within 250 words",
				},
			],
		});
		const story = textResponse.data.choices[0].message.content;

		// Form Search Result
		const searchResult = {
			UserId: userEmail,
			CreationDate: moment().format("ddd MMM/Do/YYYY h:mm:ssa"),
			ImageUrl: imageUrl,
			Story: story,
			SearchQuery: reqPrompt,
		};

		// Add search result to AWS DynamoDB
		console.log("writing search result into DynamoDB...");
		addOrUpdateSearchResult(searchResult);

		return res.status(200).json({
			success: true,
			imageUrl: imageUrl,
			story: story,
		});
	} catch (err) {
		return res.status(400).json({
			success: false,
			error: err.response
				? err.response.data
				: "There is something wrong with server.",
		});
	}
});

app.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`);
});
