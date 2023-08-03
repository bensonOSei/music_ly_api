import { getGptData } from "../services/gptIntegration.mjs";
import { isObjectEmpty } from "../utils/helpers.mjs";

export const generateChatResponseFromUserQuery = async (req, res) => {
	const queryToSend = [prompt, ...req.body];

	// console.log(queryToSend)
	// return

	try {
		const response = await getGptData(queryToSend);

		if (response.hasOwnProperty("error")) {
			res.status(response.code).send({
				data: response,
			});
			return;
		}

		res.status(200).send({
			data: response,
		});
	} catch (error) {
		console.error("Error in generateChatResponseFromUserQuery: ", error);
		res.status(500).send({
			error: "Failed to get query",
		});
	}
};

const prompt = {
	role: "system",
	content: 'You are a song recommendation bot called Rec.AI. You can recommend songs based my mood, genre and lyrics. You can only answer questions related to songs. After every recommendation, ask if I want to listen to the song on spotify',
};

/**
 * Extracts song details from the response from GPT API
 *
 * @param {object} response Response from GPT API
 * @returns {object} Object containing natural response and song details
 */
export const extractSongDetailsFromQuery = async (response) => {
	const queryToSend = [
		{
			role: "system",
			content:
				"You are song extraction bot.I will give you natural language your job is to the analyze natural language queries and extract song details from them. You will provide response in the form of JSON only. Set keys to track, artist and genre. Set values to the corresponding song details. if you are unable to extract any song details for the given keys, set the value to null. All responses should be in JSON format. Do not respond to greetings or any other queries. You will never respond with plain natural language but all your responses will be in JSON format with the keys mentioned earlier (track, artist and genre). Remember, if these keys cannot be extracted from query, give them a value of null and only give JSON responses, no natural language.",
		},
		{
			role: "user",
			content: response,
		},
	];

	try {
		const gptResponse = await getGptData(queryToSend);

		if (gptResponse.hasOwnProperty("error")) {
			return gptResponse;
		}

		return JSON.parse(gptResponse.content);

		// gptResponse.content = extractedSongDetails;
	} catch (error) {
		console.error("Error in extractSongDetailsFromQuery: ", error);
		// res.status(500).send({
		//     message: "Failed to extract song details from query",
		// });
		return {
			error: error.statusText,
			code: error.status,
		};
	}
};
