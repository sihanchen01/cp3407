const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

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

// Read name list
const NAMELIST = [];
fs.readFile("names.txt", (err, data) => {
	if (err) {
		console.log(err);
	}
	data
		.toString()
		.split("\n")
		.forEach((e) => {
			NAMELIST.push(e);
		});
});

// Get AWS DynamoDB Hooks
const {
	getAllByUserId,
	getSearchResultsByKeys,
	addOrUpdateSearchResult,
	storeImageToS3,
	deleteSearchResult,
} = require("./dynamoDB");

// Moment, date formatting
const moment = require("moment");

// Express API

/* Search result from /image and /story will not be saved into AWS DynamoDB.
Only write to DynamoDB when calling /storywithimage
*/
// Get all search results by given User ID
app.post("/get-all-results", async (req, res) => {
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
app.post("/story-with-image", async (req, res) => {
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

		const creationDate = moment().format("ddd MMM.Do.YYYY h:mm:ssa");

		// Form Search Result
		const searchResult = {
			UserId: userEmail,
			CreationDate: creationDate,
			ImageUrl: imageUrl,
			Story: story,
			SearchQuery: reqPrompt,
		};

		console.log("convert image url to s3 ...");
		const s3ImageUrl = storeImageToS3(searchResult);
		// Add search result to AWS DynamoDB
		console.log("writing search result into DynamoDB...");
		addOrUpdateSearchResult({ ...searchResult, ImageUrl: s3ImageUrl });

		return res.status(200).json({
			success: true,
			searchResult: searchResult,
			s3ImageUrl: s3ImageUrl,
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

app.post("/story-with-image-feedback", async (req, res) => {
	try {
		const { resultWithFeedback } = req.body;
		addOrUpdateSearchResult(resultWithFeedback);
		return res.status(200).json({
			success: true,
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

app.get("/whoami", async (req, res) => {
	try {
		const famousPeople = NAMELIST[Math.floor(Math.random() * NAMELIST.length)];
		const textResponse = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					content: `Give me three 30 words hints on ${famousPeople}, without mention name ${famousPeople}`,
				},
			],
		});
		const hintsRaw = textResponse.data.choices[0].message.content.split("\n");
		const hints = hintsRaw.filter((h) => h !== "");
		return res.status(200).json({
			success: true,
			hints: hints,
			answer: famousPeople,
			namelist: NAMELIST,
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
