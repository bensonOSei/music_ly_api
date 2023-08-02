import { Configuration, OpenAIApi } from "openai";

export const getGptData = async (query) => {
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
		// throw new Error("Failed to get GPT data");
	}
};
