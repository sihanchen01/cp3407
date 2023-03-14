const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors({ origin: "*" }));

require("dotenv").config();
const PORT = process.env.PORT || 5000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
	apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const STORY_TITLE = "batman vs ironman";

app.get("/", (req, res) => {
	res.send("Hello");
});

app.get("/image", async (req, res) => {
	try {
		const response = await openai.createImage({
			prompt: STORY_TITLE,
			size: "512x512",
		});

		return res.status(200).json({
			success: true,
			url: response.data.data[0].url,
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

app.get("/story", async (req, res) => {
	try {
		const textResponse = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					content: "Write a story of " + STORY_TITLE,
				},
			],
			temperature: 0.4,
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

app.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`);
});
