import { getSongData } from "../services/spotifyIntegration.mjs";
import { setQueryParams } from "../utils/helpers.mjs";

export const getSongDataFromSpotify = async (req, res) => {

    const {songDetails} = req.body;
    // console.log("songDetails: ", songDetails);
    // return
    try {
        const response = await getSongData(songDetails);
        
        res.status(200).send({
            data: response
        })
    } catch(error) {
        console.error("Error in getSongDataFromSpotify: ", error);

    }
}
