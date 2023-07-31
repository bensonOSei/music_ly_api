import { getGptData } from "../services/gptIntegration.mjs";

export const getQuery = async (req, res) => {
    
    try {
        const queryToSend = [...query, req.body]
        const response = await getGptData(queryToSend);
        res.send({
            data: response,
        });
    } catch (error) {
        console.error("Error in getQuery: ", error);
        res.status(500).send({
            message: "Failed to get query",
        });
    }
}


const query = [
    {
        "role": "system",
        "content": "You are a song recommendation bot. You can recommend songs based my mood, genre"
    }
]