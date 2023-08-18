import express from "express";
import { create, index, updateImage } from "../controllers/userController.mjs";
import { validateRegister } from "../middleware/validation.mjs";
import { authenticate } from "../middleware/auth.mjs";

export const usersRouter = express.Router();

    

usersRouter.get("/", index);

// get user by id
usersRouter.get("/:id", (req, res) => {
	res.send(`get user by id ${req.params.id}`);
});

usersRouter.post("/register", validateRegister, create);

usersRouter.patch("/image", authenticate, updateImage);

