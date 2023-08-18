export const userResource = ({ id, firstName, lastName, email, imagePath }) => {
	return {
		id: id,
		firstName: firstName,
		lastName: lastName,
		email: email,
		imagePath: imagePath
	};
};

export const userCollection = (users) => {
	return users.map((user) => userResource(user));
}
