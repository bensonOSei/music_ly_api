import axios from "axios";
import { SPOTIFY_API_URL } from "../utils/constants.mjs";
import { setQueryParams } from "../utils/helpers.mjs";


/**
 * Make a request to the Spotify API to get the song data
 * 
 * @param {object} songDetails Object containing song details
 * @returns {string} Spotify URL of the song
 */
export const getSongData = async (songDetails) => {

    // Convert songDetails object into query parameters for Spotify API
    // Query is in the form of "track:Someone+Like+You%artist:Adele%genre:Pop"
    // Can be found in official Spotify API documentation for search endpoint
    const queryString = setQueryParams(songDetails);

 try {

    // Make a request to the Spotify API 
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
    

    // Extract the Spotify URL from the response
    const data = response.data.tracks.items[0].external_urls.spotify;

    return data;

 } catch (error) {
    // catch error well
    console.log(error)
    throw new Error("Failed to connect to Spotify API");
 }
    
}
