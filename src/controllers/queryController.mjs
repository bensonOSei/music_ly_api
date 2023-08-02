import { getGptData } from "../services/gptIntegration.mjs";

export const generateChatResponseFromUserQuery = async (req, res) => {

    const queryToSend = query;

    // Loop the req.body object
    for (const [key, value] of Object.entries(req.body)) {
        queryToSend.push(value)
    }

    try {
        const response = await getGptData(queryToSend);
        const extractedDetails = await extractSongDetailsFromQuery(response.content);

        res.status(200).send({
            data: extractedDetails,
        });
    } catch (error) {
        console.error("Error in generateChatResponseFromUserQuery: ", error);
        res.status(500).send({
            error: "Failed to get query",
        });
    }
}


const query = [
    {
        "role": "system",
        "content": `You are a song recommendation bot called Rec.AI. You can recommend songs based my mood, genre and lyrics. You can only answer questions related to songs.`
    }
]


/**
 * Extracts song details from the response from GPT API
 * 
 * @param {object} response Response from GPT API 
 * @returns {object} Object containing natural response and song details
 */
export const extractSongDetailsFromQuery = async (response) => {
    const responseExtractionQuery = [
        {
            "role": "system",
            "content" : "You are song extraction bot. You analyze natural language queries and extract song details from them. You will provide response in the form of JSON only. Set keys to track, artist and genre. Set values to the corresponding song details. if you are unable to extract any song details for the given keys, set the value to null. All responses should be in JSON format. Do not respond to greetings or any other queries. You will never respond with plain natural language but all your responses will be on JSON format with the keys mentioned earlier (track, artist and genre). Remember, if these keys cannot be extracted from query, give them a value of null."
        },
        {
            "role": "user",
            "content": response
        }
    ]

    try {
        const queryToSend = responseExtractionQuery
        const gptResponse = await getGptData(queryToSend);

        const extractedSongDetails = JSON.parse(gptResponse.content);
        gptResponse.content = extractedSongDetails;
        
        return {
            naturalResponse: response,
            songDetails: extractedSongDetails
        };

    } catch (error) {
        console.error("Error in extractSongDetailsFromQuery: ", error);
        res.status(500).send({
            message: "Failed to extract song details from query",
        });
        // throw new Error("Failed to extract song details from query");
    }


}

