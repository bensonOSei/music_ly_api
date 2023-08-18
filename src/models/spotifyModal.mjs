import { connection } from "../database/connection.mjs";

export const getCredentials = async () => {
	const credentials = connection.spotify
		.findUnique({
			where: {
				id: 1,
			},
		})
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
	const set = await connection.spotify
		.update({
			where: {
				id: 1,
			},
			data: {
				access_token: access_token,
				expires_in: expires_in
			},
		})
		.then(({ access_token }) => {
			return access_token;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});

	return set;
};
