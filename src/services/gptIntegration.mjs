import { OPENAI_API_URL } from "../utils/constants.mjs";
import { Configuration, OpenAIApi } from "openai";
// import { config } from "dotenv";
// config()

export const getGptData = async (query) => {
	// return query;
	try {

		const config = new Configuration({
			apiKey: process.env.OPENAI_API_KEY,
		});

		const openai = new OpenAIApi(config);

		const completion = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: query,
		})

        return completion.data.choices[0].message;
	} catch (error) {
		console.error("Error in getGptData: ", error);
		throw new Error("Failed to get GPT data");
	}
};
