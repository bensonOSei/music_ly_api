import { getSongData } from "../services/spotifyIntegration.mjs";
import { setQueryParams } from "../utils/helpers.mjs";

export const getSongDataFromSpotify = async (req, res) => {

    const {songDetails} = req.body;

    if(songDetails === undefined) res.status(400).send({message: "Song details not provided"});

    try {
        const response = await getSongData(songDetails);
        
        res.status(200).send({
            data: response
        })
    } catch(error) {
        res.status(error.status).send({
            message: error.statusText
        })
        console.error("Error in getSongDataFromSpotify: ", error);
    }
}
