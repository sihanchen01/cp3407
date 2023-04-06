const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors({ origin: "*" }));
const https = require("https");
const fs = require("fs");

require("dotenv").config();
const PORT = process.env.PORT || 5000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Setup OpenAI API
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
	apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
	res.send("Hello");
});

app.post("/image", async (req, res) => {
	try {
		const { reqPrompt, userEmail } = req.body;
		console.log("requesting image for: " + reqPrompt);
		console.log("useremail: " + userEmail);

		// Call OpenAI API
		const response = await openai.createImage({
			prompt: reqPrompt,
			size: "512x512",
		});

		// TODO: Write search result to AWS dynamoDB

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
		const { reqPrompt, userEmail } = req.body;
		console.log("requesting story for: " + reqPrompt);
		console.log("useremail: " + userEmail);

		// Call OpenAI API
		const textResponse = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					content: "Write a story of " + reqPrompt + "within 250 words",
				},
			],
		});

		// TODO: Write search result to AWS dynamoDB

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

https
	.createServer(
		{
			cert: fs.readFileSync("sihanchen.com.crt"),
			key: fs.readFileSync("sihanchen.com.key"),
		},
		app
	)
	.listen(PORT, () => {
		console.log(`App is running on port ${PORT}`);
	});
