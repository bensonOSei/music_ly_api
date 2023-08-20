// import { sequelize } from "../database/connection.mjs";
import { User } from "../database/models/User.mjs";

export const createUser = async (userDetails) => {
	const user = await User.create(userDetails);
	return user;
};

export const getAllUsers = async () => {
	const users = await User.findAll();
	return users;
};

export const getUserById = async (id) => {
	const user = await User.findByPk(id);
	return user;
};

export const getUserByEmail = async (email) => {
	// return
	const user = await User.findOne({
		where: {
			email: email,
		},
	});
	return user;
};

export const updateUser = async (id, userDetails) => {
	const user = await User.update(userDetails,{
        where: {
            id: id
        }
    });

	return user;
};
