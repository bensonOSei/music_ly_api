import axios from "axios";
import { SPOTIFY_API_URL } from "../utils/constants.mjs";
import {
	getExpirationDate,
	isExpired,
	setQueryParams,
} from "../utils/helpers.mjs";
import { getCredentials, setAccessToken } from "../models/spotifyModal.mjs";
import qs from "qs";

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
	// return queryString;

	const attempt = await getCredentials()
		.then((data) => {
			// console.log(data)
			return data;
		})
		.catch(() => false);

	if (!attempt) {
		return {
			error: "failed to get credentials",
		};
	}

	let { access_token, expires_in } = attempt;

	// console.log(isExpired(expires_in), expires_in);
	// return { test: "this is a test" };

	if (isExpired(expires_in)) {
		access_token = await getAccessTokenFromSpotify()
			.then((data) => {
				console.log("token", data);
				return data;
			})
			.catch((error) => {
				console.log("token error", error);
				return false;
			});
		if (!access_token) {
			return {
				error: "failed to get access token",
			};
		}
	}

	// console.log("accessToken", access_token);
	// return;

	// Make a request to the Spotify API
	const response = await axios
		.get(SPOTIFY_API_URL, {
			params: {
				q: `remaster%${queryString}`,
				type: "track",
				limit: 1,
				market: "US",
				offset: 0,
				include_external: "audio",
			},
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		})
		.then(({ data }) => {
			// console.log(data);

			return {
				artist: data.tracks.items[0].artists[0].name,
				track: data.tracks.items[0].name,
				url: data.tracks.items[0].external_urls.spotify,
			};
		})
		.catch((error) => {
			console.log(error);
			if (error.response === undefined)
				return {
					error: "Failed to connect",
					code: 500,
				};


			return {
				error: error.response.statusText,
				code: error.response.status,
			};
		});

	return response;
};

/**
 * Get a new access token from Spotify
 *
 * @returns {string} Access token or false on error
 */
export const getAccessTokenFromSpotify = async () => {
	const attempt = await getCredentials()
		.then((data) => data)
		.catch(() => false);

	if (!attempt) {
		return {
			error: "failed to get credentials",
		};
	}

	const { client_id, client_secret } = attempt;



	// console.log("Getting new access token...");
	let data = qs.stringify({
		grant_type: "client_credentials",
		client_id: client_id,
		client_secret: client_secret,
	});

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: "https://accounts.spotify.com/api/token",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: data,
	};

	const newToken = await axios
		.request(config)
		.then(async (response) => {
			console.log("response",response.data)
			const { access_token } = response.data;
			const expires_in = getExpirationDate();

			const saveToken = await setAccessToken(access_token, expires_in)
				.then((data) => {
					console.log(data);
					return data;
				})
				.catch((err) => {
					console.log(err);
					return false;
				});

			return saveToken;
		})
		.catch((error) => {
			console.log(error);
			return false;
		});

	const savedToken = await getCredentials().then(data => data).catch(() => false)



	return savedToken.access_token;
};
