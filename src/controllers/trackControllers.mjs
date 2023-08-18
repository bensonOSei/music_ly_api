import { getSongData } from "../services/spotifyIntegration.mjs";
import { extractSongDetailsFromQuery } from "./queryController.mjs";

export const getSongDataFromSpotify = async (req, res) => {

    const rawResponse = req.body.content;


    // Extract song details
    const extractedData = await extractSongDetailsFromQuery(rawResponse);


    if(extractedData.hasOwnProperty('error')) {
        res.status(extractedData.code).send({
            data: extractedData,
        })
        return
    }


    try {
        const response = await getSongData(extractedData).then(data => data);
        // console.log('response',response)

        
        res.status(200).send({response})
    } catch(error) {
        // res.send({
        //     message: error.statusMessage
        // })
        console.error("Error in getSongDataFromSpotify: ", error);
    }
}
