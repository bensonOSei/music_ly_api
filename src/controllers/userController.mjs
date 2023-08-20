import {
	createUser,
	getAllUsers,
	getUserByEmail,
	getUserById,
	updateUser,
} from "../models/userModel.mjs";
import bcrypt from "bcryptjs";
import { tokenize } from "../utils/tokenGenerator.mjs";
import { userCollection, userResource } from "../resources/userResource.mjs";

export const index = async (req, res) => {
	const users = await getAllUsers();
	if (users.length === 0) {
		res.status(404).send({
			message: "No users found",
		});
		return;
	}
	res.send({
		message: userCollection(users),
	});
};

export const show = async (req, res) => {
	const user = await getUserById(req.params.id);
	if (!user) {
		res.status(404).send({
			message: "No user found",
		});
		return;
	}
	res.send({
		message: userResource(user),
	});
};

export const create = async (req, res) => {
	// console.log(req.body)
	// return
	const password = await bcrypt.hash(req.body.password, 10);

	// check if user exists
	const user = await getUserByEmail(req.body.email);
	// return
	if (user) {
		res.status(409).send({
			message: "User already exists",
		});
		return;
	}

	// create user
	const newUser = await createUser({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: password,
	});

	if (!newUser) {
		res.status(500).send({
			message: "Error creating user",
		});
		return;
	}

	const createdUser = userResource(newUser);

	// generate token
	const token = tokenize(createdUser);

	res.status(201).send({
		data: createdUser,
		token: token,
	});
};

export const update = async (req, res) => {
	// check if user exists
	const user = await getUserById(req.params.id)
		.then((foundUser) => {
			if (!foundUser) return false;

			return foundUser;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});

	if (!user) {
		res.status(404).send({
			message: "User not found",
		});
		return;
	}

	// update user
	const updatedUser = await updateUser(req.params.id, res.body)
		.then((user) => {
			if (!user) return false;

			return user;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});

	if (!updatedUser) {
		res.status(500).send({
			message: "Error updating user",
		});
		return;
	}

	res.status(201).send({
		data: userResource(updatedUser),
	});
};

export const updateImage = async (req, res) => {
	// check if user exists
	const user = await getUserById(req.user.id)
		.then((foundUser) => {
			if (!foundUser) return false;

			return foundUser;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});

	if (!user) {
		res.status(404).send({
			message: "User not found",
		});
		return;
	}

	// update user
	const updatedUser = await updateUser(req.user.id, {
		imagePath: req.body.imagePath,
	})
		.then((user) => {
			if (!user) return false;

			return user;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});

	if (!updatedUser) {
		res.status(500).send({
			message: "Error updating user",
		});
		return;
	}

	const newUser = await getUserById(req.user.id)
		.then((user) => userResource(user))
		.catch((err) => false);

	if (!newUser) {
		return res.status(500).send({
			message: "Error getting user",
		});
	}
	const token = tokenize(newUser);

	res.status(201).send({
		data: newUser,
		token: token,
	});
};
