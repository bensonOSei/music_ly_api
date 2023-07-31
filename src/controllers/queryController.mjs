import { getGptData } from "../services/gptIntegration.mjs";

export const generateChatResponseFromUserQuery = async (req, res) => {
    
    try {
        const queryToSend = [...query, req.body]
        const response = await getGptData(queryToSend);

        const extractedDetails = await extractSongDetailsFromQuery(response.content);

        res.status(200).send({
            // message: "Successfully got query",
            data: extractedDetails
        });
    } catch (error) {
        console.error("Error in generateChatResponseFromUserQuery: ", error);
        res.status(500).send({
            message: "Failed to get query",
        });
    }
}


const query = [
    {
        "role": "system",
        "content": `You are a song recommendation bot. You can recommend songs based my mood, genre and lyrics. You can only answer questions related to songs. `
    }
]


/**
 * Extracts song details from the response from GPT API
 * 
 * @param {object} response Response from GPT API 
 * @returns {object} Object containing natural response and song details
 */
const extractSongDetailsFromQuery = async (response) => {
    const responseExtractionQuery = [
        {
            "role": "system",
            "content" : "You are song extraction bot. You analyze natural language queries and extract song details from them. You will provide response in the form of JSON only."
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
        // console.log();
        gptResponse.content = extractedSongDetails;
        return {
            naturalResponse: response,
            songDetails: gptResponse
        };
    } catch (error) {
        console.error("Error in extractSongDetailsFromQuery: ", error);
        throw new Error("Failed to extract song details from query");
    }


}

