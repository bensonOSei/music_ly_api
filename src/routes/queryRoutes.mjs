import express from "express";
import { generateChatResponseFromUserQuery } from "../controllers/queryController.mjs";

export const router = express.Router();

router.post("/query", generateChatResponseFromUserQuery);
router.get("/test", (req, res) =>
	res.send({
		message: "Hello World!",
	})
);
