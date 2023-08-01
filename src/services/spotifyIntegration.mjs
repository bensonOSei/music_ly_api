import axios from "axios";
import { SPOTIFY_API_URL } from "../utils/constants.mjs";
import { setQueryParams } from "../utils/helpers.mjs";

export const getSongData = async (songDetails) => {

    const queryString = setQueryParams(songDetails);

    // return queryString;
 try {
    const response = await axios.get(SPOTIFY_API_URL, {
        params: {
            q: `remaster%${queryString}`,
            type: 'track',
            limit: 1,
            market: 'US',
            offset: 0,
            include_external: 'audio'

        },
        headers: {
            'Authorization': `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`
        }
    })
    
    const data = response.data.tracks.items[0];

    return data;

 } catch (error) {
    console.error("Error in getSongData: ", error);
    throw new Error("Failed to connect to Spotify API");
 }
    
}
