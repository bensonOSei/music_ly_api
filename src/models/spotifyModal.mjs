import { Spotify } from "../database/models/Spotify.mjs";

export const getCredentials = async () => {
	const credentials = await Spotify.findByPk(1)
		.then((cred) => {
			return cred;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});

	if (!credentials) return false;

	return credentials;
};

export const setAccessToken = async (access_token, expires_in) => {
	const set = await Spotify.update(
		{
			access_token: access_token,
			expires_in: expires_in,
		},
		{
			where: {
				id: 1,
			},
		}
	)


	return set;
};
