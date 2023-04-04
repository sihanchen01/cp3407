const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors({ origin: "*" }));

require("dotenv").config();
const PORT = process.env.PORT || 5000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
	apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// const STORY_TITLE = "batman vs ironman";

app.get("/", (req, res) => {
	res.send("Hello");
});

app.post("/image", async (req, res) => {
	try {
		const { reqPrompt } = req.body;
		console.log("requesting image for: " + reqPrompt);
		const response = await openai.createImage({
			prompt: reqPrompt,
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

app.post("/story", async (req, res) => {
	try {
		const { reqPrompt } = req.body;
		console.log("requesting story for: " + reqPrompt);
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

app.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`);
});
